import test from 'node:test';
import assert from 'node:assert/strict';
import { Writable } from 'node:stream';
import { uploadDocument, saveDocument, pdfHandler } from '../server/document-storage.js';

test('PDF is stored as bytes in a transaction, without calling Cloudinary', async () => {
    const buffer = Buffer.from('%PDF-1.7\nexample');
    let stored;
    const tx = {
        document: {
            create: async ({ data }) => ({ id: 42, ...data }),
            update: async ({ data }) => ({ id: 42, ...data }),
        },
        documentPdf: { create: async ({ data }) => { stored = data; } },
    };
    const db = { $transaction: async fn => fn(tx) };
    const result = await saveDocument(db, {}, { buffer, mimetype: 'application/pdf' }, { userId: 1, name: 'test.pdf' });
    assert.deepEqual(stored, { documentId: 42, data: buffer });
    assert.equal(result.url, '/api/documents/42/file');
    assert.equal('data' in result, false);
});

test('invalid PDF is rejected before any database or storage call', async () => {
    await assert.rejects(saveDocument({}, {}, { buffer: Buffer.from('invalid'), mimetype: 'application/pdf' }, {}), /PDF valide/);
});

test('PDF is detected from bytes even if the MIME type is incorrect', async () => {
    assert.throws(() => uploadDocument({}, { buffer: Buffer.from('%PDF-1.7'), mimetype: 'image/png' }), /MySQL/);
});

test('PDF download returns the exact bytes with inline PDF headers', async () => {
    const buffer = Buffer.from('%PDF-1.7\nexample');
    let headers;
    let body;
    const res = { set: value => { headers = value; }, send: value => { body = value; } };
    const db = { documentPdf: { findUnique: async ({ where }) => {
        assert.equal(where.documentId, 42);
        return { data: buffer };
    } } };
    await pdfHandler(db)({ params: { id: '42' } }, res);
    assert.equal(headers['Content-Type'], 'application/pdf');
    assert.match(headers['Content-Disposition'], /^inline/);
    assert.deepEqual(body, buffer);
});

test('images are sent to Cloudinary with an HTTPS URL', async () => {
    const buffer = Buffer.from('PNG image bytes');
    const chunks = [];
    const storage = { uploader: { upload_stream(options, callback) {
        assert.equal(options.resource_type, 'auto');
        return new Writable({
            write(chunk, encoding, done) { chunks.push(chunk); done(); },
            final(done) { callback(null, { secure_url: 'https://storage.example/document', bytes: buffer.length }); done(); },
        });
    } } };
    const result = await uploadDocument(storage, { buffer, mimetype: 'image/png' });
    assert.equal(result.secure_url, 'https://storage.example/document');
    assert.deepEqual(Buffer.concat(chunks), buffer);
});

test('storage failure rejects upload instead of producing a local URL', async () => {
    const storage = { uploader: { upload_stream(options, callback) {
        return new Writable({ write(chunk, encoding, done) { done(); },
            final(done) { callback(new Error('Storage unavailable')); done(); } });
    } } };
    await assert.rejects(uploadDocument(storage, { buffer: Buffer.from('pdf'), mimetype: 'image/png' }), /Storage unavailable/);
});
