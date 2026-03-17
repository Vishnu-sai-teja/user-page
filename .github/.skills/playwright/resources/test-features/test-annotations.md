---
id: test-annotations
title: "Annotations"
---

## Introduction

Use annotations/tags to control execution and improve reporting.

Built-ins:
- `test.skip`: do not run
- `test.fail`: must fail (fails if it passes)
- `test.fixme`: mark broken and skip execution
- `test.slow`: triples test timeout

They can be conditional and applied per test or per group.

## Focus a test

```js
test.only('focus this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});
```

## Skip a test

```js
test.skip('skip this test', async ({ page }) => {
  // This test is not run
});
```

## Conditionally skip a test

```js
test('skip this test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});
```

## Group tests

```js
import { test, expect } from '@playwright/test';

test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

## Tag tests

Use `@tag` in details or title.

```js
import { test, expect } from '@playwright/test';

test('test login page', {
  tag: '@fast',
}, async ({ page }) => {
  // ...
});

test('test full report @slow', async ({ page }) => {
  // ...
});
```

Group + multiple tags:

```js
import { test, expect } from '@playwright/test';

test.describe('group', {
  tag: '@report',
}, () => {
  test('test report header', async ({ page }) => {
    // ...
  });

  test('test full report', {
    tag: ['@slow', '@vrt'],
  }, async ({ page }) => {
    // ...
  });
});
```

Filter by tag:

```bash
npx playwright test --grep @fast
```

Exclude tag:

```bash
npx playwright test --grep-invert @fast
```

OR:

```bash
npx playwright test --grep "@fast|@slow"
```

AND:

```bash
npx playwright test --grep "(?=.*@fast)(?=.*@slow)"
```

## Add custom annotations

Use `{ type, description }` for richer metadata.

```js
import { test, expect } from '@playwright/test';

test('test login page', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  // ...
});
```

Group or multiple annotations:

```js
import { test, expect } from '@playwright/test';

test.describe('report tests', {
  annotation: { type: 'category', description: 'report' },
}, () => {
  test('test report header', async ({ page }) => {
    // ...
  });

  test('test full report', {
    annotation: [
      { type: 'issue', description: 'https://github.com/microsoft/playwright/issues/23180' },
      { type: 'performance', description: 'very slow test!' },
    ],
  }, async ({ page }) => {
    // ...
  });
});
```

## Conditionally skip a group

```js title="example.spec.ts"

test.describe('chromium only', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test.beforeAll(async () => {
    // This hook is only run in Chromium.
  });

  test('test 1', async ({ page }) => {
    // This test is only run in Chromium.
  });

  test('test 2', async ({ page }) => {
    // This test is only run in Chromium.
  });
});
```

## Use `fixme` in `beforeEach`

```js title="example.spec.ts"

test.beforeEach(async ({ page, isMobile }) => {
  test.fixme(isMobile, 'Settings page does not work in mobile yet');

  await page.goto('http://localhost:3000/settings');
});

test('user profile', async ({ page }) => {
  await page.getByText('My Profile').click();
  // ...
});
```

## Runtime annotations

Add during execution via `test.info().annotations`.

```js title="example.spec.ts"

test('example test', async ({ page, browser }) => {
  test.info().annotations.push({
    type: 'browser version',
    description: browser.version(),
  });

  // ...
});
```
