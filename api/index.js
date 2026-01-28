const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config();

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
        let user = await prisma.user.findUnique({ where: { clerkId } });

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
                type: result.format || 'unknown', // e.g., 'pdf', 'jpg'
                size: (result.bytes / 1024 / 1024).toFixed(2) + ' MB', // Convert size to MB string
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
module.exports = app;

// Local Dev
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Serveur Backend démarré sur http://localhost:${PORT}`);
    });
}
