const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

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

// 2. CREATE / SYNC USER (From Clerk or Frontend)
app.post('/api/users', async (req, res) => {
    const { clerkId, email, firstName, lastName, role } = req.body;
    try {
        // Check if user exists
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

// 4. MOCK UPLOAD DOCUMENT
app.post('/api/documents', async (req, res) => {
    const { userId, name, type, size } = req.body;

    try {
        // userId must be an existing User ID (int)
        const doc = await prisma.document.create({
            data: {
                name,
                type,
                size,
                userId: parseInt(userId)
            }
        });
        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur upload" });
    }
});

// Default route for testing
app.get('/api', (req, res) => {
    res.send('API EP2C is running');
});

// EXPORT FOR VERCEL
module.exports = app;

// LOCAL DEV START
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Serveur Backend démarré sur http://localhost:${PORT}`);
    });
}
