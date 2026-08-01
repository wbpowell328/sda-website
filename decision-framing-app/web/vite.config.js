import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';
import path from 'node:path';

// During local dev, the Vite dev server runs on its own port and proxies
// API calls to the Express server (see server/server.js) on PORT (3100).
// In production, Express serves this app's build output directly (no proxy).
export default defineConfig({
  plugins: [react()],
  // This repo lives inside a Dropbox-synced folder on Windows, which locks
  // files during Vite's dep-cache rename and causes "EBUSY: resource busy"
  // errors. Keep the cache outside Dropbox entirely to avoid that.
  cacheDir: path.join(os.tmpdir(), 'castle-framing-app-vite-cache'),
  server: {
    proxy: {
      '/api': 'http://localhost:3100',
      '/health': 'http://localhost:3100',
    },
  },
});
