import { Readable } from 'node:stream';

export function uploadDocument(storage, file) {
    if (isPdf(file)) throw new Error('Les PDF doivent être enregistrés dans MySQL.');
    return new Promise((resolve, reject) => {
        const upload = storage.uploader.upload_stream({
            folder: 'ep2c_documents',
            resource_type: 'auto',
            type: 'upload',
            access_mode: 'public',
        }, (error, result) => {
            if (error) return reject(error);
            if (!result?.secure_url?.startsWith('https://')) {
                return reject(new Error('Le stockage ne retourne pas une URL HTTPS valide.'));
            }
            resolve(result);
        });
        upload.on('error', reject);
        Readable.from(file.buffer).on('error', reject).pipe(upload);
    });
}

export function isPdf(file) {
    return file.mimetype === 'application/pdf' || /\.pdf$/i.test(file.originalname || '') ||
        file.buffer.subarray(0, 5).toString() === '%PDF-';
}

export async function saveDocument(prisma, storage, file, metadata) {
    const size = (file.buffer.length / 1024 / 1024).toFixed(2) + ' MB';
    if (isPdf(file)) {
        if (file.buffer.subarray(0, 5).toString() !== '%PDF-') {
            const error = new Error('Le fichier fourni n’est pas un PDF valide.');
            error.status = 400;
            throw error;
        }
        return prisma.$transaction(async tx => {
            const doc = await tx.document.create({ data: { ...metadata, type: 'pdf', size } });
            await tx.documentPdf.create({ data: { documentId: doc.id, data: file.buffer } });
            return tx.document.update({ where: { id: doc.id }, data: { url: `/api/documents/${doc.id}/file` } });
        });
    }
    const result = await uploadDocument(storage, file);
    return prisma.document.create({ data: { ...metadata, size, type: result.format || 'unknown', url: result.secure_url } });
}

export function pdfHandler(prisma) {
    return async (req, res) => {
        const id = Number(req.params.id);
        if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Identifiant invalide' });
        try {
            const pdf = await prisma.documentPdf.findUnique({ where: { documentId: id } });
            if (!pdf) return res.status(404).json({ error: 'PDF introuvable' });
            res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="document-${id}.pdf"`,
                'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' });
            return res.send(Buffer.from(pdf.data));
        } catch {
            return res.status(503).json({ error: 'Impossible de charger le PDF' });
        }
    };
}
