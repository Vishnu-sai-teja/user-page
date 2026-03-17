import { defineConfig, devices } from '@playwright/test'

/**
 * E2E smoke test configuration for the About Me Carbon app.
 * Runs Chromium only for local review validation; CI can extend to other browsers.
 */
export default defineConfig({
  testDir: './src/tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
