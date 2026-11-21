import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Extra HTML pages, keyed by their folder (each one is served at /<name>/)
const pages = ['qrcode'];

/**
 * Redirects /<page> to /<page>/ in the dev and preview servers,
 * like GitHub Pages does, instead of falling back to the main page.
 */
const trailingSlashRedirect = () => {
  const middleware = (req, res, next) => {
    const [pathname, query] = req.url.split('?');
    const page = pathname.replace(/^\/|\/$/g, '');
    if (pages.includes(page) && !pathname.endsWith('/')) {
      res.statusCode = 301;
      res.setHeader('Location', `/${page}/${query ? `?${query}` : ''}`);
      res.end();
      return;
    }
    next();
  };
  return {
    name: 'trailing-slash-redirect',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
};

export default defineConfig({
  plugins: [react(), trailingSlashRedirect()],
  build: {
    rollupOptions: {
      // Multi-page build: each HTML entry is emitted at the same path (qrcode/index.html -> /qrcode/)
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        ...Object.fromEntries(
          pages.map((page) => [page, resolve(import.meta.dirname, `${page}/index.html`)])
        ),
      },
    },
  },
});
