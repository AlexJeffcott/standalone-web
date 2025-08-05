import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:8547',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Using Node.js serve until Bun issue is resolved: https://github.com/oven-sh/bun/issues/8222
    command: 'npx serve e2e -p 8547',
    port: 8547,
    reuseExistingServer: !process.env.CI,
  },
});
