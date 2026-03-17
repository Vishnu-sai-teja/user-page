---
id: test-timeouts
title: "Timeouts"
---

Playwright has separate timeout controls. Use the smallest scope needed.

| Timeout | Default | Use For |
|:--|:--|:--|
| Test timeout | 30_000 ms | Whole test + fixtures + `beforeEach` |
| Expect timeout | 5_000 ms | Auto-retrying assertions |
| Global timeout | none | Entire test run |
| Action timeout | none | Single action (click/fill/etc.) |
| Navigation timeout | none | `goto` and navigation waits |
| Hook timeout | 30_000 ms | `beforeAll` / `afterAll` |
| Fixture timeout | none | Slow fixture setup |

## Test timeout

Set globally:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120_000,
});
```

Per test:

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test('slow test', async ({ page }) => {
  test.slow(); // Easy way to triple the default timeout
  // ...
});

test('very slow test', async ({ page }) => {
  test.setTimeout(120_000);
  // ...
});
```

From `beforeEach`:

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30_000);
});
```

For `beforeAll` / `afterAll` hook:

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  // Set timeout for this hook.
  test.setTimeout(60000);
});
```

## Expect timeout

Set globally:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 10_000,
  },
});
```

Per assertion:

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test('example', async ({ page }) => {
  await expect(locator).toHaveText('hello', { timeout: 10_000 });
});
```

## Global timeout

Fail the whole run if it exceeds a limit.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTimeout: 3_600_000,
});
```

## Action and navigation timeouts

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },
});
```

Per action override:

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev', { timeout: 30000 });
  await page.getByText('Get Started').click({ timeout: 10000 });
});
```

## Fixture timeout

Useful for slow worker-scoped fixtures.

```js title="example.spec.ts"
import { test as base, expect } from '@playwright/test';

const test = base.extend<{ slowFixture: string }>({
  slowFixture: [async ({}, use) => {
    // ... perform a slow operation ...
    await use('hello');
  }, { timeout: 60_000 }]
});

test('example test', async ({ slowFixture }) => {
  // ...
});
```

## Practical guidance

- Prefer fixing flaky waits over increasing timeouts.
- Tune `expect` first, then action/navigation, then test timeout.
- Keep global timeout as a safety net.
