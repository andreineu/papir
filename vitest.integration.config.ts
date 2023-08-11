import { loadEnvConfig } from '@next/env';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
  loadEnvConfig(process.cwd());

  return {
    test: {
      include: ['test/trpc/*.test.ts'],
      threads: false,
      setupFiles: ['src/lib/testing/setup-prisma.ts'],
    },
    resolve: {
      alias: [{ find: '@src', replacement: resolve(__dirname, './src') }],
    },
  };
});
