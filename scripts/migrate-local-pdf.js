import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { PrismaClient } from '@prisma/client';

const filename = process.argv[2];
const apply = process.argv.includes('--apply');
if (!filename || basename(filename) !== filename || !filename.endsWith('.pdf')) {
    throw new Error('Usage: node scripts/migrate-local-pdf.js FICHIER.pdf [--apply]');
}
const prisma = new PrismaClient();
try {
    const oldUrl = `/api/uploads/${filename}`;
    const documents = await prisma.document.findMany({ where: { url: oldUrl }, select: { id: true } });
    const buffer = await readFile(new URL(`../api/uploads/${filename}`, import.meta.url));
    if (buffer.subarray(0, 5).toString() !== '%PDF-') throw new Error('Fichier PDF invalide');
    console.log(JSON.stringify({ matchingDocuments: documents.length, bytes: buffer.length, apply }));
    if (documents.length && apply) {
        await prisma.$transaction(async tx => {
            for (const doc of documents) {
                await tx.documentPdf.upsert({ where: { documentId: doc.id },
                    create: { documentId: doc.id, data: buffer }, update: { data: buffer } });
                const saved = await tx.documentPdf.findUnique({ where: { documentId: doc.id } });
                if (!Buffer.from(saved.data).equals(buffer)) throw new Error('Vérification du PDF en base échouée');
                const result = await tx.document.updateMany({ where: { id: doc.id, url: oldUrl },
                    data: { url: `/api/documents/${doc.id}/file`, type: 'pdf' } });
                if (result.count !== 1) throw new Error('Document modifié pendant la migration');
            }
        });
        console.log(JSON.stringify({ updatedDocuments: documents.length, databasePdfVerified: true }));
    }
} finally {
    await prisma.$disconnect();
}
