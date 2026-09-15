import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const children = [];
let stopping = false;

function stop(code) {
    if (stopping) return;
    stopping = true;
    process.exitCode = code;
    for (const child of children) child.kill('SIGTERM');
    const timeout = setTimeout(() => {
        for (const child of children) child.kill('SIGKILL');
    }, 3000);
    timeout.unref();
}

function start(name, script, args = []) {
    console.log(`[dev] Démarrage ${name}...`);
    const child = spawn(process.execPath, [script, ...args], {
        cwd: root,
        stdio: 'inherit',
        env: process.env,
    });
    children.push(child);
    child.on('error', error => {
        console.error(`[dev] Impossible de lancer ${name} : ${error.message}`);
        stop(1);
    });
    child.on('exit', (code, signal) => {
        if (!stopping) {
            console.error(`[dev] ${name} s'est arrêté (${signal || code}).`);
            stop(code || 1);
        }
    });
}

console.log('[dev] EP2C — chargement du site et de l’API (Ctrl+C pour arrêter).');
start('API', 'scripts/start.js');
start('Vite', 'node_modules/vite/bin/vite.js');

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
