import test from 'node:test';
import assert from 'node:assert/strict';
import { checkDatabase } from '../server/database-health.js';

test('missing configuration does not query the database', async () => {
    assert.deepEqual(await checkDatabase({}, ''), { status: 'error', code: 'DATABASE_URL_MISSING' });
});

test('healthy result requires application tables including PDF storage and leaks no records', async () => {
    const calls = [];
    const db = Object.fromEntries(['user', 'document', 'folder', 'documentPdf'].map(name => [name, {
        findFirst: async () => { calls.push(name); return { email: 'private@example.com' }; }
    }]));
    assert.deepEqual(await checkDatabase(db, 'configured'), { status: 'ok', database: 'connected', schema: 'ready' });
    assert.deepEqual(calls, ['user', 'document', 'folder', 'documentPdf']);
});

for (const [code, expected] of [['P1000', 'DATABASE_AUTH_FAILED'], ['P1001', 'DATABASE_UNREACHABLE'], ['P2021', 'DATABASE_SCHEMA_MISSING'], ['P2022', 'DATABASE_SCHEMA_MISSING'], ['UNKNOWN', 'DATABASE_UNAVAILABLE']]) {
    test(`database failure ${code} produces a safe diagnostic`, async () => {
        const db = { user: { findFirst: async () => { throw { code, message: 'SECRET DATABASE URL' }; } } };
        assert.deepEqual(await checkDatabase(db, 'configured'), { status: 'error', code: expected });
    });
}
