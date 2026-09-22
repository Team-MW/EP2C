import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';

const sql = await readFile(new URL('../prisma/document-pdf.sql', import.meta.url), 'utf8');
if (!process.argv.includes('--apply')) {
    console.log(sql);
} else {
    const prisma = new PrismaClient();
    try {
        await prisma.$executeRawUnsafe(sql);
        await prisma.documentPdf.findFirst({ select: { documentId: true } });
        console.log('Table DocumentPdf prête. Aucune table existante supprimée ou réinitialisée.');
    } finally {
        await prisma.$disconnect();
    }
}
