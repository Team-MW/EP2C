import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import clerk from '@clerk/clerk-sdk-node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

const app = express();

// --- CONFIGURATION ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// --- DB HELPERS ---
async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return { users: [], folders: [], documents: [], appointments: [] };
    }
}

async function writeDb(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// --- ROUTES ---

// 0. HEALTH CHECK
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running with JSON DB!', time: new Date() });
});

// 1. GET ALL USERS (Admin)
app.get('/api/users', async (req, res) => {
    try {
        const db = await readDb();
        const users = db.users.map(u => ({
            ...u,
            documents: db.documents.filter(d => d.userId === u.id)
        }));
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
        const db = await readDb();
        let user = db.users.find(u => u.clerkId === clerkId);

        if (!user && email) {
            user = db.users.find(u => u.email === email);
            if (user) {
                user.clerkId = clerkId;
                if (firstName) user.firstName = firstName;
                if (lastName) user.lastName = lastName;
            }
        }

        if (!user) {
            user = {
                id: generateId(),
                clerkId,
                email,
                firstName,
                lastName,
                role: role || 'client',
                status: 'En attente',
                createdAt: new Date().toISOString()
            };
            db.users.push(user);
        }
        
        await writeDb(db);
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

        const db = await readDb();
        let user = db.users.find(u => u.email === email);

        if (user) {
            user.clerkId = clerkId;
            user.firstName = firstName;
            user.lastName = lastName;
            user.company = company;
            user.status = 'En attente';
        } else {
            user = {
                id: generateId(),
                clerkId,
                email,
                firstName,
                lastName,
                company,
                role: 'client',
                status: 'En attente',
                createdAt: new Date().toISOString()
            };
            db.users.push(user);
        }

        await writeDb(db);
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
        const db = await readDb();
        const user = db.users.find(u => u.clerkId === clerkId);
        
        if (!user) return res.status(404).json({ error: 'User not found' });

        const userDocs = db.documents.filter(d => d.userId === user.id);
        res.json(userDocs);
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

        const uploadFromBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ep2c_documents",
                        resource_type: "auto",
                        access_mode: "public",
                        type: "upload"
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(buffer).pipe(cld_upload_stream);
            });
        };

        const result = await uploadFromBuffer(file.buffer);

        const category = req.body.category || 'Autre';
        const displayName = `[${category}] ${file.originalname}`;
        const parsedFolderId = folderId && folderId !== 'null' && folderId !== 'undefined' ? parseInt(folderId) : null;

        const db = await readDb();
        const doc = {
            id: generateId(),
            name: displayName,
            type: result.format || 'unknown',
            size: (result.bytes / 1024 / 1024).toFixed(2) + ' MB',
            url: result.secure_url,
            status: 'En attente',
            createdAt: new Date().toISOString(),
            userId: parseInt(userId),
            folderId: parsedFolderId,
            isRead: false
        };
        db.documents.push(doc);
        await writeDb(db);

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
        const db = await readDb();
        const folder = {
            id: generateId(),
            name,
            createdAt: new Date().toISOString(),
            userId: parseInt(userId),
            parentId: parentId ? parseInt(parentId) : null
        };
        db.folders.push(folder);
        await writeDb(db);
        
        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: 'Erreur création dossier' });
    }
});

// 6. GET ALL FOLDERS FOR A USER
app.get('/api/users/:clerkId/folders', async (req, res) => {
    const { clerkId } = req.params;
    try {
        const db = await readDb();
        const user = db.users.find(u => u.clerkId === clerkId);
        
        if (!user) return res.status(404).json({ error: 'User not found' });

        const userFolders = db.folders.filter(f => f.userId === user.id);
        // sort by desc
        userFolders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(userFolders);
    } catch (error) {
        res.status(500).json({ error: 'Erreur recuperation dossiers' });
    }
});

// 7. DELETE A FOLDER
app.delete('/api/folders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await readDb();
        const parsedId = parseInt(id);
        
        db.folders = db.folders.filter(f => f.id !== parsedId);
        db.documents = db.documents.filter(d => d.folderId !== parsedId);
        
        await writeDb(db);
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
        const db = await readDb();
        const folder = db.folders.find(f => f.id === parseInt(id));
        if (folder) folder.name = name;
        await writeDb(db);
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
        const db = await readDb();
        const folder = db.folders.find(f => f.id === parseInt(id));
        if (folder) folder.parentId = parentId ? parseInt(parentId) : null;
        await writeDb(db);
        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: 'Erreur déplacement dossier' });
    }
});

// 10. RENAME A DOCUMENT
app.put('/api/documents/:id/rename', async (req, res) => {
    const { name } = req.body;
    try {
        const db = await readDb();
        const doc = db.documents.find(d => d.id === parseInt(req.params.id));
        if (!doc) return res.status(404).json({ error: 'Doc non trouvé' });
        doc.name = name;
        await writeDb(db);
        res.json(doc);
    } catch (e) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 10b. MARK DOCUMENT AS READ
app.put('/api/documents/:id/read', async (req, res) => {
    try {
        const db = await readDb();
        const doc = db.documents.find(d => d.id === parseInt(req.params.id));
        if (!doc) return res.status(404).json({ error: 'Doc non trouvé' });
        doc.isRead = true;
        await writeDb(db);
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
        const db = await readDb();
        const document = db.documents.find(d => d.id === parseInt(id));
        if (document) document.folderId = folderId ? parseInt(folderId) : null;
        await writeDb(db);
        res.json(document);
    } catch (error) {
        res.status(500).json({ error: 'Erreur déplacement document' });
    }
});

// 12. DELETE USER
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await readDb();
        const parsedId = parseInt(id);
        
        db.documents = db.documents.filter(d => d.userId !== parsedId);
        db.folders = db.folders.filter(f => f.userId !== parsedId);
        db.users = db.users.filter(u => u.id !== parsedId);
        
        await writeDb(db);
        res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur suppression utilisateur' });
    }
});

// 13. DELETE DOCUMENT
app.delete('/api/documents/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await readDb();
        const parsedId = parseInt(id);
        const doc = db.documents.find(d => d.id === parsedId);
        
        if (!doc) return res.status(404).json({ error: 'Document non trouvé' });

        const urlParts = doc.url.split('/');
        const fileNameWithExt = urlParts[urlParts.length - 1];
        const fileName = fileNameWithExt.split('.')[0];
        const publicId = `ep2c_documents/${fileName}`;

        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (e) {
            console.warn("Cloudinary delete warning:", e);
        }

        db.documents = db.documents.filter(d => d.id !== parsedId);
        await writeDb(db);

        res.json({ success: true, message: 'Document supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur suppression document' });
    }
});

app.get('/api', (req, res) => {
    res.send('API EP2C JSON is running');
});

export default app;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Serveur Backend (JSON) démarré sur http://localhost:${PORT}`);
    });
}
