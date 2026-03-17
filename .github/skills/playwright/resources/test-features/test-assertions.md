---
id: test-assertions
title: "Assertions"
---

## Introduction

Playwright includes test assertions via `expect`. Use generic matchers (`toEqual`, `toContain`, `toBeTruthy`) for any conditions, or **async matchers** (web-specific) that auto-retry until the condition is met or a timeout is reached.

```js
expect(success).toBeTruthy();                                        // sync, generic
await expect(page.getByTestId('status')).toHaveText('Submitted');   // async, auto-retrying
```

Default timeout for assertions is **5 seconds** (see `TestConfig.expect` to configure it).

---



## Auto-retrying assertions

Must be `await`-ed. Playwright re-checks until the condition passes or times out.

| Assertion | Description |
| :- | :- |
| `await expect(locator).toBeAttached()` | Element is attached |
| `await expect(locator).toBeChecked()` | Checkbox is checked |
| `await expect(locator).toBeDisabled()` | Element is disabled |
| `await expect(locator).toBeEditable()` | Element is editable |
| `await expect(locator).toBeEmpty()` | Container is empty |
| `await expect(locator).toBeEnabled()` | Element is enabled |
| `await expect(locator).toBeFocused()` | Element is focused |
| `await expect(locator).toBeHidden()` | Element is not visible |
| `await expect(locator).toBeInViewport()` | Element intersects viewport |
| `await expect(locator).toBeVisible()` | Element is visible |
| `await expect(locator).toContainText()` | Element contains text |
| `await expect(locator).toContainClass()` | Element has specified CSS classes |
| `await expect(locator).toHaveAccessibleDescription()` | Element has matching accessible description |
| `await expect(locator).toHaveAccessibleName()` | Element has matching accessible name |
| `await expect(locator).toHaveAttribute()` | Element has a DOM attribute |
| `await expect(locator).toHaveClass()` | Element has specified CSS class property |
| `await expect(locator).toHaveCount()` | List has exact number of children |
| `await expect(locator).toHaveCSS()` | Element has CSS property |
| `await expect(locator).toHaveId()` | Element has an ID |
| `await expect(locator).toHaveJSProperty()` | Element has a JavaScript property |
| `await expect(locator).toHaveRole()` | Element has a specific ARIA role |
| `await expect(locator).toHaveScreenshot()` | Element matches a screenshot |
| `await expect(locator).toHaveText()` | Element matches text |
| `await expect(locator).toHaveValue()` | Input has a value |
| `await expect(locator).toHaveValues()` | Select has options selected |
| `await expect(locator).toMatchAriaSnapshot()` | Element matches the Aria snapshot |
| `await expect(page).toHaveScreenshot()` | Page matches a screenshot |
| `await expect(page).toHaveTitle()` | Page has a title |
| `await expect(page).toHaveURL()` | Page has a URL |
| `await expect(response).toBeOK()` | Response has an OK status |

---



## Non-retrying assertions

Synchronous assertions that do **not** auto-retry. Avoid for async UI state — prefer auto-retrying assertions, `expect.poll`, or `expect.toPass` instead.

| Assertion | Description |
| :- | :- |
| `toBe` | Value is the same |
| `toBeCloseTo` | Number is approximately equal |
| `toBeDefined` | Value is not `undefined` |
| `toBeFalsy` | Value is falsy |
| `toBeGreaterThan` / `toBeGreaterThanOrEqual` | Number comparison |
| `toBeInstanceOf` | Object is an instance of a class |
| `toBeLessThan` / `toBeLessThanOrEqual` | Number comparison |
| `toBeNaN` | Value is `NaN` |
| `toBeNull` | Value is `null` |
| `toBeTruthy` | Value is truthy |
| `toBeUndefined` | Value is `undefined` |
| `toContain` | String/Array/Set contains element |
| `toContainEqual` | Array/Set contains similar element |
| `toEqual` | Deep equality and pattern matching |
| `toHaveLength` | Array or string has length |
| `toHaveProperty` | Object has a property |
| `toMatch` | String matches a regular expression |
| `toMatchObject` | Object contains specified properties |
| `toStrictEqual` | Deep equality including property types |
| `toThrow` | Function throws an error |

---



## Asymmetric matchers

Nest inside other assertions for relaxed matching:

| Matcher | Description |
| :- | :- |
| `expect.any()` | Matches any instance of a class/primitive |
| `expect.anything()` | Matches anything |
| `expect.arrayContaining()` | Array contains specific elements |
| `expect.arrayOf()` | Array contains elements of specific type |
| `expect.closeTo()` | Number is approximately equal |
| `expect.objectContaining()` | Object contains specific properties |
| `expect.stringContaining()` | String contains a substring |
| `expect.stringMatching()` | String matches a regular expression |

---



## Negating matchers

Prefix any matcher with `.not` to assert the opposite:

```js
expect(value).not.toEqual(0);
await expect(locator).not.toContainText('some text');
```

---



## Soft assertions

Soft assertions **do not** stop test execution on failure — they let the test continue and mark it as failed at the end.

```js
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');
await page.getByRole('link', { name: 'next page' }).click();
await expect.soft(page.getByRole('heading', { name: 'Make another order' })).toBeVisible();

// Check for any soft failures at any point:
expect(test.info().errors).toHaveLength(0);
```

Soft assertions support custom messages: `expect.soft(value, 'my soft assertion').toBe(56);`

> Soft assertions only work with the Playwright test runner.

---



## Custom expect message

Pass a message as the second argument to `expect` for clearer failure output:

```js
await expect(page.getByText('Name'), 'should be logged in').toBeVisible();
```

---



## expect.configure

Create a pre-configured `expect` instance with defaults like `timeout` or `soft`:

```js
const slowExpect = expect.configure({ timeout: 10000 });
await slowExpect(locator).toHaveText('Submit');

const softExpect = expect.configure({ soft: true });
await softExpect(locator).toHaveText('Submit');
```

---



