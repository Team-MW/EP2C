import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { checkDatabase } from '../server/database-health.js';

const prisma = new PrismaClient();
try {
    const result = await checkDatabase(prisma);
    console.log(JSON.stringify(result));
    process.exitCode = result.status === 'ok' ? 0 : 1;
} finally {
    await prisma.$disconnect();
}
