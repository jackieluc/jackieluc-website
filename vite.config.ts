/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    exclude: [
      // default
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      // misc.
      '.vscode',
      'coverage',
      'public',
      // playwright e2e
      'tests',
      'test-results',
      'playwright-report',
      '/playwright',
    ],
    environment: 'happy-dom',
    setupFiles: ['./test/setup-test-env.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
