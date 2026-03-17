---
id: test-use-options
title: "Configuration (use)"
---

## Introduction

`use` defines shared browser/context defaults.
Override at project, file, describe, or test scope only when needed.

```ts title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    storageState: 'state.json',
  },
});
```

## Common options

- `baseURL`: path-based navigation (`page.goto('/path')`)
- `storageState`: preload auth/session
- `testIdAttribute`: standardize test selectors

## Emulation

```ts
export default defineConfig({
  use: {
    viewport: { width: 1280, height: 720 },
    colorScheme: 'dark',
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    locale: 'en-GB',
    permissions: ['geolocation'],
    timezoneId: 'Europe/Paris',
  },
});
```

Use for locale/timezone/device-specific behavior checks.

## Network and env controls

```ts
export default defineConfig({
  use: {
    acceptDownloads: false,
    extraHTTPHeaders: { 'X-Env': 'e2e' },
    httpCredentials: { username: 'user', password: 'pass' },
    ignoreHTTPSErrors: true,
    offline: false,
    proxy: { server: 'http://proxy.local:3128', bypass: 'localhost' },
  },
});
```

## Recording options

```ts
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
});
```

Practical default: record only on retries/failures to control artifact size.

## Other useful options

```ts
export default defineConfig({
  use: {
    actionTimeout: 0,
    browserName: 'chromium',
    bypassCSP: true,
    channel: 'chrome',
    headless: true,
    testIdAttribute: 'data-testid',
  },
});
```

## Advanced pass-through options

```ts
export default defineConfig({
  use: {
    launchOptions: { slowMo: 50 },
    contextOptions: { locale: 'en-US' },
  },
});
```

## Inheritance

Contexts created from built-in `browser` fixture inherit `use` defaults.

```ts
test('inherits use options', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // This page uses the config-defined userAgent and viewport.
  await context.close();
});
```

## Scopes

Global:

```ts
export default defineConfig({
  use: { locale: 'en-GB' },
});
```

Project:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'de-DE',
      },
    },
  ],
});
```

File/describe:

```ts
import { test } from '@playwright/test';

test.use({ locale: 'fr-FR' });

test.describe('french locale', () => {
  test.use({ locale: 'fr-FR' });
});
```

## Reset options

Reset to config value:

```ts
test.describe('reset baseURL', () => {
  test.use({ baseURL: undefined });
});
```

Fully unset value:

```ts
test.use({
  baseURL: [async ({}, use) => use(undefined), { scope: 'test' }],
});
```
