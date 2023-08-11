import { loadEnvConfig } from '@next/env';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
  loadEnvConfig(process.cwd());

  return {
    test: {
      exclude: ['test/trpc/*.test.ts'],
      include: ['src/**/*.test.ts'],
    },
    resolve: {
      alias: [{ find: '@src', replacement: resolve(__dirname, './src') }],
    },
  };
});
