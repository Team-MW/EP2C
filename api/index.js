import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import 'dotenv/config';

const app = express();
const prisma = new PrismaClient();

// --- CONFIGUccRATION ---

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Clerk (Auto-loads from CLERK_SECRET_KEY in .env)
import clerk from '@clerk/clerk-sdk-node';

// Multer (Memory Storage for Serverless)
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 0. HEALTH CHECK
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running!', time: new Date() });
});

// 1. GET ALL USERS.  (Admin)
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { documents: true }
        });
        if (users.length > 0) {
            users.forEach(u => {
                if (u.documents.length > 0) {
                    console.log(`User ${u.email} has doc URL:`, u.documents[0].url);
                }
            });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 2. CREATE / SYNC USER
app.post('/api/users', async (req, res) => {
    const { clerkId, email, firstName, lastName, role } = req.body;
    try {
        // Try to find by Clerk ID first
        let user = await prisma.user.findUnique({ where: { clerkId } });

        // If not found, try to find by Email (Pre-provisioning case)
        if (!user && email) {
            user = await prisma.user.findUnique({ where: { email } });
            if (user) {
                // Link the real Clerk ID to the pre-existing user
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { clerkId, firstName, lastName } // Update details too
                });
            }
        }

        // If still not found, create new
        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkId,
                    email,
                    firstName,
                    lastName,
                    role: role || 'client'
                }
            });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur création user' });
    }
});

// 2b. MANUAL CREATE (Admin)
app.post('/api/users/manual', async (req, res) => {
    const { email, firstName, lastName, company } = req.body;
    try {
        let clerkUser;
        let clerkId;

        try {
            // 1. Create User in Clerk
            // Note: This requires CLERK_SECRET_KEY in .env
            clerkUser = await clerk.users.createUser({
                emailAddress: [email],
                firstName,
                lastName,
                skipPasswordRequirement: true, // User works via email code or will set password later? 
                // Actually Clerk usually handles "invitations", but direct create works too.
                // If skipPasswordRequirement is true, they might need to use Magic Link or Reset Password flow.
            });
            clerkId = clerkUser.id;
        } catch (clerkErr) {
            // Check if user already exists in Clerk
            if (clerkErr.errors && clerkErr.errors[0]?.code === 'form_identifier_exists') {
                console.log("User already in Clerk, finding...");
                const userList = await clerk.users.getUserList({ emailAddress: [email] });
                if (userList.length > 0) {
                    clerkId = userList[0].id;
                } else {
                    throw clerkErr;
                }
            } else {
                console.error("Clerk Create Error:", clerkErr);
                throw clerkErr;
            }
        }

        // 2. Create/Sync in Database
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                clerkId, firstName, lastName, company, status: 'En attente'
            },
            create: {
                clerkId,
                email,
                firstName,
                lastName,
                company,
                role: 'client',
                status: 'En attente'
            }
        });

        res.json(user);
    } catch (error) {
        console.error("Manual create error:", error);
        res.status(500).json({ error: error.message || 'Erreur création manuelle' });
    }
});

// 3. GET DOCUMENTS FOR A USER
app.get('/api/users/:clerkId/documents', async (req, res) => {
    const { clerkId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { clerkId },
            include: { documents: true }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        console.log("Docs for user", clerkId, ":", user.documents);
        res.json(user.documents);
    } catch (error) {
        res.status(500).json({ error: 'Erreur recuperation documents' });
    }
});

// 4. REAL UPLOAD DOCUMENT (Cloudinary + DB)
app.post('/api/documents', upload.single('file'), async (req, res) => {
    try {
        const { userId } = req.body; // Comes from FormData
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Aucun fichier fourni" });
        }

        // 4a. Upload to Cloudinary via Stream
        const uploadFromBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ep2c_documents",
                        resource_type: "auto",
                        access_mode: "public", // Force public access
                        type: "upload"         // Standard public upload
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(buffer).pipe(cld_upload_stream);
            });
        };

        const result = await uploadFromBuffer(file.buffer);

        // 4b. Save Metadata in Prisma
        const doc = await prisma.document.create({
            data: {
                name: file.originalname,
                type: result.format || 'unknown',
                size: (result.bytes / 1024 / 1024).toFixed(2) + ' MB',
                url: result.secure_url,
                userId: parseInt(userId)
            }
        });

        res.json(doc);

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Erreur upload vers Cloudinary" });
    }
});

// 5. DELETE USER (Admin)
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Delete all documents associated with this user first
        await prisma.document.deleteMany({
            where: { userId: parseInt(id) }
        });

        // Then delete the user
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });

        res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ error: 'Erreur suppression utilisateur' });
    }
});

// 6. DELETE DOCUMENT
app.delete('/api/documents/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Get document info first to delete from Cloudinary
        const doc = await prisma.document.findUnique({
            where: { id: parseInt(id) }
        });

        if (!doc) {
            return res.status(404).json({ error: 'Document non trouvé' });
        }

        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/[cloud]/[resource_type]/upload/v[version]/[public_id].[format]
        const urlParts = doc.url.split('/');
        const fileNameWithExt = urlParts[urlParts.length - 1];
        const fileName = fileNameWithExt.split('.')[0];
        const publicId = `ep2c_documents/${fileName}`;

        // Delete from Cloudinary
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
            console.warn("Cloudinary delete warning:", cloudinaryError);
            // Continue even if Cloudinary delete fails
        }

        // Delete from database
        await prisma.document.delete({
            where: { id: parseInt(id) }
        });

        res.json({ success: true, message: 'Document supprimé avec succès' });
    } catch (error) {
        console.error("Delete Document Error:", error);
        res.status(500).json({ error: 'Erreur suppression document' });
    }
});

// Default route
app.get('/api', (req, res) => {
    res.send('API EP2C is running');
});

// Export for Vercel
export default app;

// Local Dev: Run only if executed directly (ESM doesn't have require.main === module, checking process.argv can work but complicated. 
// For local dev with 'node api/index.js', we can just run listen. 
// But Vercel imports it. 
// A common pattern is to listen if not imported.
// In ESM: import.meta.url === pathToFileURL(process.argv[1]).href
// Or just check if we are in Vercel environment.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Serveur Backend démarré sur http://localhost:${PORT}`);
    });
}
