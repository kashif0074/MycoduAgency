import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 Starting Mycodu Agency development environment...');

// Determine shell settings for Windows cross-compatibility
const shell = process.platform === 'win32' ? true : false;

// 1. Spawn Frontend (Vite)
const frontend = spawn('npx', ['vite'], {
  cwd: projectRoot,
  stdio: ['inherit', 'pipe', 'pipe'],
  shell
});

// 2. Spawn Backend (Express Server)
const backend = spawn('node', ['server/server.js'], {
  cwd: projectRoot,
  stdio: ['inherit', 'pipe', 'pipe'],
  shell
});

// Helper to format output
const logOutput = (prefix, data, colorCode) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    if (line) {
      console.log(`\x1b[${colorCode}m${prefix}\x1b[0m ${line}`);
    }
  });
};

// Pipe Frontend Logs (Cyan color prefix code: 36)
frontend.stdout.on('data', (data) => logOutput('[Frontend]', data, '36'));
frontend.stderr.on('data', (data) => logOutput('[Frontend Err]', data, '31'));

// Pipe Backend Logs (Magenta color prefix code: 35)
backend.stdout.on('data', (data) => logOutput('[Backend]', data, '35'));
backend.stderr.on('data', (data) => logOutput('[Backend Err]', data, '31'));

// Clean exit handling
const cleanup = (code) => {
  console.log('\nStopping all processes...');
  try {
    frontend.kill();
  } catch {}
  try {
    backend.kill();
  } catch {}
  process.exit(code);
};

process.on('SIGINT', () => cleanup(0));
process.on('SIGTERM', () => cleanup(0));

frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  cleanup(code);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  cleanup(code);
});
