---
id: running-tests
title: "Running and debugging tests"
---

## Introduction

Run one test, many tests, or all tests.

Defaults:
- headless
- parallel
- all configured projects

Use `--project`, `--headed`, `--ui`, and `--debug` to change behavior.

## Running tests

### Command line

```bash
npx playwright test
```

### UI mode

```bash
npx playwright test --ui
```

### Headed mode

```bash
npx playwright test --headed
```

### Specific browsers/projects

```bash
npx playwright test --project webkit
```

```bash
npx playwright test --project webkit --project firefox
```

### Specific files or titles

```bash
npx playwright test landing-page.spec.ts
```

```bash
npx playwright test tests/todo-page/ tests/landing-page/
```

```bash
npx playwright test landing login
```

```bash
npx playwright test -g "add a todo item"
```

### Last failed only

```bash
npx playwright test --last-failed
```

### VS Code

Run from the Playwright VS Code extension (test gutter or testing sidebar).

## Debugging tests

### Fastest option: UI mode

```bash
npx playwright test --ui
```

Use it for step-by-step flow, locator inspection, logs, and failures.

### Playwright Inspector

Debug all tests:

```bash
npx playwright test --debug
```

Debug one file:

```bash
npx playwright test example.spec.ts --debug
```

Debug one test by line:

```bash
npx playwright test example.spec.ts:10 --debug
```

## Test reports

Open HTML report:

```bash
npx playwright show-report
```

Use report filters and per-step details for failure analysis.

## What's next

- Generate tests with codegen
- Inspect traces
- Use UI mode deeply
- Add CI execution
