// Only stable codes are exposed; Prisma messages may contain connection details.
export function databaseErrorCode(error) {
    const code = error?.code || error?.errorCode;
    if (code === 'P1000') return 'DATABASE_AUTH_FAILED';
    if (['P1001', 'P1002', 'P1008', 'P1017', 'P2024'].includes(code)) return 'DATABASE_UNREACHABLE';
    if (['P2021', 'P2022'].includes(code)) return 'DATABASE_SCHEMA_MISSING';
    return 'DATABASE_UNAVAILABLE';
}

export async function checkDatabase(prisma, databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) return { status: 'error', code: 'DATABASE_URL_MISSING' };
    try {
        // Check the application tables and columns, not just TCP connectivity.
        await prisma.user.findFirst();
        await prisma.document.findFirst();
        await prisma.folder.findFirst();
        return { status: 'ok', database: 'connected', schema: 'ready' };
    } catch (error) {
        const code = databaseErrorCode(error);
        console.error('[database]', code);
        return { status: 'error', code };
    }
}
