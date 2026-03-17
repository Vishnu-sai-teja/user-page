---
id: test-global-setup-teardown
title: "Global setup and teardown"
---

## Introduction

Two patterns:
- project dependencies (recommended)
- `globalSetup` / `globalTeardown`

Prefer project dependencies for better runner integration.

## Quick comparison

| Feature | Project dependencies | `globalSetup` |
|:--|:--:|:--:|
| Runs before tests | Yes | Yes |
| Visible in HTML report | Yes | No |
| Traces | Yes | No |
| Fixtures | Yes | No |
| Config inheritance | Yes | Limited |

## Option 1: Project dependencies (recommended)

Define a setup project, then make test projects depend on it.

```js title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
      teardown: 'cleanup db',
    },
    {
      name: 'cleanup db',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'chromium with db',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup db'],
    },
  ]
});
```

Setup test:

```js title="tests/global.setup.ts"
import { test as setup } from '@playwright/test';

setup('create new database', async ({ }) => {
  console.log('creating new database...');
  // Initialize the database
});
```

Teardown test:

```js title="tests/global.teardown.ts"
import { test as teardown } from '@playwright/test';

teardown('delete database', async ({ }) => {
  console.log('deleting test database...');
  // Delete the database
});
```

Filtering behavior:
- selected dependent tests also run their dependencies
- use `--no-deps` to skip dependencies/teardowns

## Option 2: `globalSetup` / `globalTeardown`

Use when you need a simple one-time script outside project model.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
});
```

Auth setup example:

```js title="global-setup.ts"
import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);
  await page.getByLabel('User Name').fill('user');
  await page.getByLabel('Password').fill('password');
  await page.getByText('Sign in').click();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
```

Config for that flow:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'http://localhost:3000/',
    storageState: 'state.json',
  },
});
```

Pass data via env vars if needed:

```js title="global-setup.ts"
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.FOO = 'some data';
  process.env.BAR = JSON.stringify({ some: 'data' });
}

export default globalSetup;
```

## Tracing setup failures (manual mode)

When using `globalSetup`, start tracing and stop it in `try/catch` before rethrowing.
