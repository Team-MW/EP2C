import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import { checkDatabase } from '../server/database-health.js';
import { saveDocument, pdfHandler } from '../server/document-storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Démarrage du backend EP2C...');

const app = express();
const prisma = new PrismaClient();

async function getClerk() {
    const clerkMod = await import('@clerk/clerk-sdk-node');
    if (!process.env.CLERK_SECRET_KEY) {
        throw new Error('CLERK_SECRET_KEY manquante dans .env');
    }
    if (typeof clerkMod.createClerkClient === 'function') {
        return clerkMod.createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerkMod.clerkClient || clerkMod.default;
}

function clerkErrorMessage(error) {
    const first = error?.errors?.[0];
    if (first?.longMessage) return first.longMessage;
    if (first?.message) return first.message;
    return error?.message || 'Erreur Clerk inconnue';
}

// --- CONFIGURATION ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());

// Compatibility for existing local documents; new uploads always use durable storage.
if (!process.env.VERCEL) {
    app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
}

// --- ROUTES ---

// 0. HEALTH CHECK
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running', time: new Date() });
});

app.get('/api/health', async (req, res) => {
    const result = await checkDatabase(prisma);
    res.set('Cache-Control', 'no-store').status(result.status === 'ok' ? 200 : 503).json(result);
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
    } catch (error) {
        console.error("=== ERROR IN POST /api/users ===", error);
        res.status(500).json({ error: 'Impossible de synchroniser le compte. Vérifiez la connexion à la base de données.' });
    }
});

// 2b. MANUAL CREATE (Admin)
app.post('/api/users/manual', async (req, res) => {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const firstName = String(req.body?.firstName || '').trim();
    const lastName = String(req.body?.lastName || '').trim();
    const company = String(req.body?.company || '').trim() || null;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Email invalide' });
    }
    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'Prénom et nom obligatoires' });
    }

    try {
        const clerk = await getClerk();
        let clerkId;
        let createdInClerk = false;

        try {
            const clerkUser = await clerk.users.createUser({
                emailAddress: [email],
                firstName,
                lastName,
                skipPasswordRequirement: true,
                publicMetadata: { role: 'client', createdBy: 'admin' },
            });
            clerkId = clerkUser.id;
            createdInClerk = true;
        } catch (clerkErr) {
            const code = clerkErr?.errors?.[0]?.code;
            if (code === 'form_identifier_exists') {
                const userList = await clerk.users.getUserList({ emailAddress: [email] });
                const existing = Array.isArray(userList) ? userList[0] : userList?.data?.[0];
                if (!existing?.id) throw clerkErr;
                clerkId = existing.id;
                await clerk.users.updateUser(clerkId, { firstName, lastName }).catch(() => {});
            } else {
                return res.status(400).json({ error: clerkErrorMessage(clerkErr) });
            }
        }

        let inviteUrl = null;
        try {
            const token = await clerk.signInTokens.createSignInToken({
                userId: clerkId,
                expiresInSeconds: 60 * 60 * 24 * 7, // 7 jours
            });
            inviteUrl = token.url || null;
        } catch (tokenErr) {
            console.warn('Impossible de créer le lien de connexion Clerk:', clerkErrorMessage(tokenErr));
        }

        let user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { clerkId, firstName, lastName, company, status: 'En attente' },
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
                    status: 'En attente',
                },
            });
        }

        res.json({
            ...user,
            documents: [],
            inviteUrl,
            createdInClerk,
            message: inviteUrl
                ? 'Client créé. Envoyez-lui le lien de connexion (valable 7 jours).'
                : 'Client créé. Il pourra se connecter via /login avec cet email (mot de passe oublié / code email selon Clerk).',
        });
    } catch (error) {
        console.error('Manual create error:', error);
        res.status(500).json({ error: clerkErrorMessage(error) });
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

        const category = req.body.category || 'Autre';
        const displayName = `[${category}] ${file.originalname}`;
        const parsedFolderId = folderId && folderId !== 'null' && folderId !== 'undefined' ? parseInt(folderId) : null;

        const doc = await saveDocument(prisma, cloudinary, file, {
            name: displayName,
            status: 'En attente',
            isRead: false,
            userId: parseInt(userId),
            folderId: parsedFolderId,
        });

        res.json(doc);
    } catch (error) {
        console.error("Erreur d'upload:", error);
        res.status(error.status === 400 ? 400 : 500).json({ error: error.status === 400 ? error.message : 'Enregistrement du document impossible' });
    }
});

app.get('/api/documents/:id/file', pdfHandler(prisma));

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
            const isRaw = doc.url.includes('/raw/upload/');
            const fileName = isRaw ? fileNameWithExt : fileNameWithExt.replace(/\.[^.]+$/, '');
            const publicId = `ep2c_documents/${fileName}`;

            try {
                await cloudinary.uploader.destroy(publicId, { resource_type: isRaw ? 'raw' : (doc.url.includes('/video/upload/') ? 'video' : 'image') });
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

app.use('/api', (req, res) => res.status(404).json({ error: 'Route API introuvable' }));
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'Le fichier dépasse la limite de 4 Mo.' });
    }
    res.status(500).json({ error: 'Erreur serveur' });
});

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, async () => {
        console.log(`Serveur Backend (Prisma) démarré sur http://localhost:${PORT}`);
        try {
            await prisma.$connect();
            console.log('Base de données connectée');
        } catch (e) {
            console.error('Impossible de se connecter à la base de données:', e.message);
        }
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Le port ${PORT} est déjà utilisé. Arrête l'autre application ou lance avec PORT=3002 npm run dev`);
        } else {
            console.error('Erreur serveur:', err.message);
        }
        process.exit(1);
    });
}
