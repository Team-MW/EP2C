import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import 'dotenv/config';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import clerk from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();

// --- CONFIGURATION ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Setup static uploads directory for PDFs
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fsSync.existsSync(UPLOADS_DIR)) {
    fsSync.mkdirSync(UPLOADS_DIR);
}
app.use('/api/uploads', express.static(UPLOADS_DIR));


// --- ROUTES ---

// 0. HEALTH CHECK
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running with MySQL (PlanetScale)!', time: new Date() });
});

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
    console.log("=== POST /api/users CALLED ===");
    console.log("Req Body:", req.body);
    const { clerkId, email, firstName, lastName, role } = req.body;
    try {
        let user = await prisma.user.findUnique({
            where: { clerkId }
        });

        if (!user && email) {
            user = await prisma.user.findUnique({
                where: { email }
            });
            if (user) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        clerkId,
                        ...(firstName && { firstName }),
                        ...(lastName && { lastName })
                    }
                });
            }
        }

        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkId,
                    email,
                    firstName,
                    lastName,
                    role: role || 'client',
                    status: 'En attente'
                }
            });
        }
        
        console.log("=== USER SYNC SUCCESS ===", user.id);
        res.json(user);
    } catch (error: any) {
        console.error("=== ERROR IN POST /api/users ===", error);
        res.status(500).json({ error: 'Erreur: ' + (error.message || 'unknown error') });
    }
});

// 2b. MANUAL CREATE (Admin)
app.post('/api/users/manual', async (req, res) => {
    const { email, firstName, lastName, company } = req.body;
    try {
        let clerkUser;
        let clerkId;

        try {
            clerkUser = await clerk.users.createUser({
                emailAddress: [email],
                firstName,
                lastName,
                skipPasswordRequirement: true,
            });
            clerkId = clerkUser.id;
        } catch (clerkErr) {
            if (clerkErr.errors && clerkErr.errors[0]?.code === 'form_identifier_exists') {
                const userList = await clerk.users.getUserList({ emailAddress: [email] });
                if (userList.length > 0) {
                    clerkId = userList[0].id;
                } else {
                    throw clerkErr;
                }
            } else {
                throw clerkErr;
            }
        }

        let user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { clerkId, firstName, lastName, company, status: 'En attente' }
            });
        } else {
            user = await prisma.user.create({
                data: {
                    clerkId,
                    email,
                    firstName,
                    lastName,
                    company,
                    role: 'client',
                    status: 'En attente'
                }
            });
        }

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
        res.json(user.documents);
    } catch (error) {
        res.status(500).json({ error: 'Erreur recuperation documents' });
    }
});

// 4. REAL UPLOAD DOCUMENT (Cloudinary + DB)
app.post('/api/documents', upload.single('file'), async (req, res) => {
    try {
        const { userId, folderId } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ error: "Aucun fichier fourni" });

        let secure_url;
        let size;
        let format;

        if (file.mimetype === 'application/pdf') {
            const fileName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const filePath = path.join(UPLOADS_DIR, fileName);
            await fs.writeFile(filePath, file.buffer);
            secure_url = `/api/uploads/${fileName}`;
            size = (file.size / 1024 / 1024).toFixed(2) + ' MB';
            format = 'pdf';
        } else {
            const uploadFromBuffer = (buffer) => {
                return new Promise((resolve, reject) => {
                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        { folder: "ep2c_documents", resource_type: "auto", access_mode: "public", type: "upload" },
                        (error, result) => { if (result) resolve(result); else reject(error); }
                    );
                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });
            };
            const result = await uploadFromBuffer(file.buffer);
            secure_url = result.secure_url;
            size = (result.bytes / 1024 / 1024).toFixed(2) + ' MB';
            format = result.format || 'unknown';
        }

        const category = req.body.category || 'Autre';
        const displayName = `[${category}] ${file.originalname}`;
        const parsedFolderId = folderId && folderId !== 'null' && folderId !== 'undefined' ? parseInt(folderId) : null;

        const doc = await prisma.document.create({
            data: {
                name: displayName,
                type: format,
                size: size,
                url: secure_url,
                status: 'En attente',
                isRead: false,
                userId: parseInt(userId),
                folderId: parsedFolderId
            }
        });

        res.json(doc);
    } catch (error) {
        console.error("Erreur d'upload:", error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// 5. CREATE A FOLDER
app.post('/api/folders', async (req, res) => {
    const { name, userId, parentId } = req.body;
    try {
        const folder = await prisma.folder.create({
            data: {
                name,
                userId: parseInt(userId),
                parentId: parentId ? parseInt(parentId) : null
            }
        });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: 'Erreur création dossier' });
    }
});

// 6. GET ALL FOLDERS FOR A USER
app.get('/api/users/:clerkId/folders', async (req, res) => {
    const { clerkId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { clerkId },
            include: {
                folders: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.folders);
    } catch (error) {
        res.status(500).json({ error: 'Erreur recuperation dossiers' });
    }
});

// 7. DELETE A FOLDER
app.delete('/api/folders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const parsedId = parseInt(id);
        
        // Documents matching the folder ID will be SetNull based on the Prisma schema relation (onDelete: SetNull), 
        // but we can also manually delete them if that was the intent. Actually the old API just filtered them out?
        // Old API: db.documents = db.documents.filter(d => d.folderId !== parsedId);
        // This implies they were deleted. So we delete them explicitly.
        await prisma.document.deleteMany({
            where: { folderId: parsedId }
        });
        
        await prisma.folder.delete({
            where: { id: parsedId }
        });
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur suppression dossier' });
    }
});

// 8. RENAME A FOLDER
app.put('/api/folders/:id/rename', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const folder = await prisma.folder.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: 'Erreur renommage dossier' });
    }
});

// 9. MOVE A FOLDER
app.put('/api/folders/:id/move', async (req, res) => {
    const { id } = req.params;
    const { parentId } = req.body;
    try {
        const folder = await prisma.folder.update({
            where: { id: parseInt(id) },
            data: { parentId: parentId ? parseInt(parentId) : null }
        });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: 'Erreur déplacement dossier' });
    }
});

// 10. RENAME A DOCUMENT
app.put('/api/documents/:id/rename', async (req, res) => {
    const { name } = req.body;
    try {
        const doc = await prisma.document.update({
            where: { id: parseInt(req.params.id) },
            data: { name }
        });
        res.json(doc);
    } catch (e) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 10b. MARK DOCUMENT AS READ
app.put('/api/documents/:id/read', async (req, res) => {
    try {
        const doc = await prisma.document.update({
            where: { id: parseInt(req.params.id) },
            data: { isRead: true }
        });
        res.json({ success: true, doc });
    } catch (e) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 11. MOVE A DOCUMENT
app.put('/api/documents/:id/move', async (req, res) => {
    const { id } = req.params;
    const { folderId } = req.body;
    try {
        const document = await prisma.document.update({
            where: { id: parseInt(id) },
            data: { folderId: folderId ? parseInt(folderId) : null }
        });
        res.json(document);
    } catch (error) {
        res.status(500).json({ error: 'Erreur déplacement document' });
    }
});

// 12. DELETE USER
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const parsedId = parseInt(id);
        
        await prisma.document.deleteMany({ where: { userId: parsedId } });
        await prisma.folder.deleteMany({ where: { userId: parsedId } });
        await prisma.user.delete({ where: { id: parsedId } });
        
        res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur suppression utilisateur' });
    }
});

// 13. DELETE DOCUMENT
app.delete('/api/documents/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const parsedId = parseInt(id);
        const doc = await prisma.document.findUnique({ where: { id: parsedId } });
        
        if (!doc) return res.status(404).json({ error: 'Document non trouvé' });

        if (doc.url && doc.url.includes('cloudinary')) {
            const urlParts = doc.url.split('/');
            const fileNameWithExt = urlParts[urlParts.length - 1];
            const fileName = fileNameWithExt.split('.')[0];
            const publicId = `ep2c_documents/${fileName}`;

            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (e) {
                console.warn("Cloudinary delete warning:", e);
            }
        }

        await prisma.document.delete({ where: { id: parsedId } });
        res.json({ success: true, message: 'Document supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur suppression document' });
    }
});

app.get('/api', (req, res) => {
    res.send('API EP2C Prisma is running');
});

export default app;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Serveur Backend (Prisma) démarré sur http://localhost:${PORT}`);
    });
}
