// CASTLE decision-framing app — Express server. Serves the built React SPA
// (web/dist) as static files and the JSON API under /api. Same-origin so
// session cookies work reliably (no cross-origin cookie issues).

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { initDb, dbConfigured, dbReady } from './lib/db.js';
import { attachUser } from './lib/auth.js';
import authRouter from './routes/auth.js';
import projectsRouter from './routes/projects.js';
import metricsRouter from './routes/metrics.js';
import decisionsRouter from './routes/decisions.js';
import matrixRouter from './routes/matrix.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });

const PORT = Number(process.env.PORT) || 3100;

if (!dbConfigured()) {
  console.error('Missing TURSO_DATABASE_URL / TURSO_AUTH_TOKEN. Copy .env.example to .env and fill them in.');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, db: dbReady() });
});

app.use(attachUser);
app.use(authRouter);
app.use(projectsRouter);
app.use(metricsRouter);
app.use(decisionsRouter);
app.use(matrixRouter);

// Serve the built SPA, once it exists (added in a later phase).
const WEB_DIST = path.join(__dirname, '..', 'web', 'dist');
if (existsSync(WEB_DIST)) {
  app.use(express.static(WEB_DIST));
  app.get('*', (req, res) => res.sendFile(path.join(WEB_DIST, 'index.html')));
}

// Catches errors forwarded by asyncHandler (and anything express itself
// passes along) so a bug returns a 500 instead of the request hanging.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal server error.' });
});

initDb()
  .then((ok) => {
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`CASTLE framing app running: http://localhost:${PORT}`);
      console.log(`Database:                   ${ok ? 'connected' : 'NOT connected'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  })
  .catch((e) => {
    console.error('Failed to initialize database:', e.message);
    process.exit(1);
  });
