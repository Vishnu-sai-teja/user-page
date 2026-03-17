---
id: test-configuration
title: "Configuration"
---

## Introduction

Configure runner-level options at top level.
Put browser/context defaults inside `use`.

## Basic config

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Core options

- `testDir`: test file root
- `forbidOnly`: fail CI if `test.only` is committed
- `fullyParallel`: parallelize across files/tests
- `retries`: retry policy
- `workers`: max parallel workers
- `projects`: multiple browser/env profiles
- `reporter`: output format
- `use`: shared browser/context defaults
- `webServer`: start app before tests

## Filter tests

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testIgnore: '*test-assets',
  testMatch: '*todo-tests/*.spec.ts',
});
```

## Advanced config

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  outputDir: 'test-results',
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  timeout: 30000,
});
```

## Expect config

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 10,
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.1,
    },
  },
});
```

## Practical defaults

- local: fewer retries, more workers
- CI: `forbidOnly`, retries on, workers constrained
- traces/videos: keep on retry or on failure only
