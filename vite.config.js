import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Serve /docs and /api-status from their own HTML entry points (dev and preview),
// mirroring Vercel's cleanUrls in production.
const pageRoutes = {
  '/docs': '/docs.html',
  '/api-status': '/api-status.html',
  '/terms': '/terms.html',
  '/privacy': '/privacy.html',
};
function pageRewrite(server) {
  server.middlewares.use((req, _res, next) => {
    const path = req.url.split('?')[0].replace(/\/$/, '');
    if (pageRoutes[path]) req.url = pageRoutes[path];
    next();
  });
}
const pages = {
  name: 'page-routes',
  configureServer: pageRewrite,
  configurePreviewServer: pageRewrite,
};

export default defineConfig({
  plugins: [react(), pages],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        docs: resolve(import.meta.dirname, 'docs.html'),
        apiStatus: resolve(import.meta.dirname, 'api-status.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
      },
    },
  },
  server: {
    proxy: { '^/api/': 'http://localhost:3000' },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    globals: true,
    css: false,
  },
});
