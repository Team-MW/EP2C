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

// --- CONFIGURATION ---

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer (Memory Storage for Serverless)
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. GET ALL USERS (Admin)
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { documents: true }
        });
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
        // Generate a temporary placeholder ID
        const tempId = `pre_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const user = await prisma.user.create({
            data: {
                clerkId: tempId,
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
        if (error.code === 'P2002') {
            return res.status(409).json({ error: "Cet email existe déjà." });
        }
        res.status(500).json({ error: 'Erreur création manuelle' });
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
                        folder: "ep2c_documents", // Optional: Organize in folder
                        resource_type: "auto"     // Detect PDF, JPG, etc.
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
