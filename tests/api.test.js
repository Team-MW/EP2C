import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';

// Exercise the exported Vercel handler without touching a real database.
process.env.VERCEL = '1';
process.env.DATABASE_URL = '';
const { default: app } = await import('../api/index.js');

test('serverless API returns JSON diagnostics and preserves unknown API routes', async (t) => {
    const server = app.listen(0, '127.0.0.1');
    t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
    await once(server, 'listening');
    const base = `http://127.0.0.1:${server.address().port}`;

    const ping = await fetch(`${base}/api/ping`);
    assert.equal(ping.status, 200);
    assert.equal((await ping.json()).status, 'ok');

    const health = await fetch(`${base}/api/health`);
    assert.equal(health.status, 503);
    assert.equal(health.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await health.json(), { status: 'error', code: 'DATABASE_URL_MISSING' });

    const unknown = await fetch(`${base}/api/does-not-exist`);
    assert.equal(unknown.status, 404);
    assert.match(unknown.headers.get('content-type'), /application\/json/);

    const data = new FormData();
    data.append('file', new Blob([new Uint8Array(4 * 1024 * 1024 + 1)]), 'too-large.pdf');
    const upload = await fetch(`${base}/api/documents`, { method: 'POST', body: data });
    assert.equal(upload.status, 413);
    assert.match((await upload.json()).error, /4 Mo/);
});
