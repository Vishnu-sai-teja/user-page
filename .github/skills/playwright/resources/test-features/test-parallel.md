---
id: test-parallel
title: "Parallelism"
---

## Introduction

Playwright runs **test files** in parallel by default using multiple worker processes. Tests within a single file run in order in the same worker. Workers are always restarted after a test failure to ensure a clean environment.

| Mode | How |
|---|---|
| Parallel (default) | Test files run across workers |
| File-level parallel | `test.describe.configure({ mode: 'parallel' })` |
| Fully parallel | `fullyParallel: true` in config |
| Serial | `test.describe.configure({ mode: 'serial' })` |
| Disabled | `workers: 1` |



## Controlling workers

```bash
npx playwright test --workers 4
npx playwright test --workers=1        # disable parallelism
```

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: process.env.CI ? 2 : undefined,
  fullyParallel: true,                 // all tests in all files run in parallel
  maxFailures: process.env.CI ? 10 : undefined,  // fail fast on CI
});
```



## Parallelize tests in a single file

```js
test.describe.configure({ mode: 'parallel' });

test('runs in parallel 1', async ({ page }) => { /* ... */ });
test('runs in parallel 2', async ({ page }) => { /* ... */ });
```

To opt out of `fullyParallel` for a specific describe block:

```js
test.describe('sequential group', () => {
  test.describe.configure({ mode: 'default' });
  test('in order 1', async ({ page }) => {});
  test('in order 2', async ({ page }) => {});
});
```



## Sharding

```bash
npx playwright test --shard=2/3
```

See the sharding guide for distributing tests across multiple machines.



## Worker index and isolating data

Each worker gets `workerIndex` (unique, starts at 1) and `parallelIndex` (0 to workers-1). Use these to isolate per-worker test data:

```js title="playwright/fixtures.ts"
import { test as baseTest } from '@playwright/test';
import { createUserInTestDatabase, deleteUserFromTestDatabase } from './my-db-utils';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { dbUserName: string }>({
  dbUserName: [async ({}, use) => {
    const userName = `user-${test.info().workerIndex}`;
    await createUserInTestDatabase(userName);
    await use(userName);
    await deleteUserFromTestDatabase(userName);
  }, { scope: 'worker' }],
});
```

```js title="tests/example.spec.ts"
import { test, expect } from '../playwright/fixtures';

test('test', async ({ dbUserName }) => { /* use the per-worker user */ });
```



## Control test order

- Within a file: declaration order (unless parallelized).
- Across files: no guarantee (files run in parallel).
- With parallelism disabled: files run alphabetically. Use naming conventions like `001-signin.spec.ts`, `002-checkout.spec.ts` to enforce order.


