---
id: test-projects
title: "Projects"
---

## Introduction

A project is a named test profile.
Use projects for browsers, devices, environments, and subsets.

## Multi-browser / device projects

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
});
```

## Run projects

Run all:

```bash
npx playwright test
```

Run one:

```bash
npx playwright test --project=firefox
```

## Environment-specific projects

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  projects: [
    {
      name: 'staging',
      use: { baseURL: 'staging.example.com' },
      retries: 2,
    },
    {
      name: 'production',
      use: { baseURL: 'production.example.com' },
      retries: 0,
    },
  ],
});
```

## Split suites into projects

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  projects: [
    {
      name: 'Smoke',
      testMatch: /.*smoke.spec.ts/,
      retries: 0,
    },
    {
      name: 'Default',
      testIgnore: /.*smoke.spec.ts/,
      retries: 2,
    },
  ],
});
```

## Dependencies

Use dependencies for setup chains (recommended for global setup flows).

```js title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
  ],
});
```

Execution model:
- dependencies run first
- dependents run after dependency success
- use `--no-deps` to skip dependency execution

Teardown:
- use `TestProject.teardown` on setup project to run cleanup last

## Practical guidance

- keep project names clear (`smoke`, `staging`, `webkit`)
- avoid too many near-duplicate projects
- isolate env-specific config inside each project
