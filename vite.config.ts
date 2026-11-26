import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    // Never inline files as data: URLs. The server CSP only allows fonts from 'self'.
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        legal: resolve(import.meta.dirname, 'legal/index.html'),
        inksync: resolve(import.meta.dirname, 'projects/inksync/index.html'),
        infra: resolve(import.meta.dirname, 'projects/infra/index.html'),
      },
    },
  },
});
