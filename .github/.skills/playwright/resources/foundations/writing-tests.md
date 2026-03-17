---
id: writing-tests
title: "Writing tests"
---
## Introduction

Playwright tests are intentionally small and readable: you **perform actions** and **assert the state**. The runner automatically waits for elements to become ready and for async expectations to pass, which helps keep tests stable without manual sleeps.

This guide shows how to:

- Write a first test that navigates and asserts a page
- Perform common actions with locators
- Use assertions that wait for UI changes
- Keep tests isolated and predictable
- Organize tests with hooks and groups

## First test

A test is just a function with a name and a body. You get a `page` fixture to drive the browser.

```ts title="tests/example.spec.ts"
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

Add a second test in the same file to show a flow:

```ts title="tests/example.spec.ts"
import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

Tip for JavaScript files: add `// @ts-check` at the top for inline type checking in VS Code.

## Actions

### Navigation

Most tests start with navigation. Playwright waits for the page to load before moving on.

```ts
await page.goto('https://example.com/');
```

### Locators and interactions

Locators are the primary way to target elements. They describe *what* to find rather than *when*, which makes them resilient to timing issues.

```ts
const getStarted = page.getByRole('link', { name: 'Get started' });
await getStarted.click();
```

You can write the same in one line:

```ts
await page.getByRole('link', { name: 'Get started' }).click();
```

### Common actions

Here are typical actions you will use often:

```ts
await page.getByLabel('Email').fill('user@example.com');
await page.getByLabel('Password').fill('super-secret');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.getByRole('checkbox', { name: 'Remember me' }).check();
await page.getByRole('combobox', { name: 'Country' }).selectOption('US');
```

## Assertions

Assertions validate expected outcomes. Playwright provides async assertions that automatically wait for the UI to match the expectation.

```ts
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
await expect(page.getByText('Signed in successfully')).toBeVisible();
```

For values you already have in code, use regular synchronous assertions:

```ts
expect([1, 2, 3]).toContain(2);
expect(user.isActive).toBeTruthy();
```

### Assertion patterns that scale

- Prefer user-visible outcomes: headings, alerts, or URLs.
- Avoid asserting on brittle details like exact classes or nested DOM structure.
- Use `toHaveText` or `toContainText` for stable copy in UI.

Example with a list:

```ts
const items = page.getByRole('listitem');
await expect(items).toHaveCount(3);
await expect(items.nth(0)).toContainText('Basic plan');
```

## Test isolation

Each test runs with its own browser context. That means cookies, local storage, and session state are clean between tests. You can rely on a predictable starting point every time.

```ts title="tests/isolation.spec.ts"
import { test } from '@playwright/test';

test('first test', async ({ page }) => {
  // This page is isolated to this test only.
});

test('second test', async ({ page }) => {
  // This page has no shared state with the first test.
});
```

## Using test hooks

Hooks help you reduce duplication and keep tests focused. Put repeated setup steps in `beforeEach` and cleanup in `afterEach`.

```ts title="tests/navigation.spec.ts"
import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('lands on home', async ({ page }) => {
    await expect(page).toHaveURL('https://playwright.dev/');
  });

  test('shows docs link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  });
});
```

## Practical checklist

Use this quick checklist when writing a new test:

- Start from a clean state (navigation or setup in a hook).
- Find elements using accessible roles, labels, or visible text.
- Perform a small set of actions per test.
- Assert on a user-visible outcome.
- Keep tests independent and deterministic.
