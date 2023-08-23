import { loadEnvConfig } from '@next/env';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
  loadEnvConfig(process.cwd());

  return {
    plugins: [react()],
    test: {
      exclude: ['test/trpc/*.test.ts'],
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      environment: 'jsdom',
      setupFiles: [
        './src/lib/testing/setup-rtl.ts',
        './src/lib/testing/setup-router.ts',
      ],
    },
    resolve: {
      alias: [{ find: '@src', replacement: resolve(__dirname, './src') }],
    },
  };
});
