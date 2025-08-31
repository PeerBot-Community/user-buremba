import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/test',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'bun run dev',
    port: 3000,
  },
});