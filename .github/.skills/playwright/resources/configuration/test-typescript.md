---
id: test-typescript
title: "TypeScript"
---

## Introduction

Playwright runs TypeScript tests out of the box.

Still run type-checking separately (`tsc --noEmit`) because Playwright execution is not a full compile gate.

CI example:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    ...
    - name: Run type checks
      run: npx tsc -p tsconfig.json --noEmit
    - name: Run Playwright tests
      run: npx playwright test
```

Local watch mode:

```sh
npx tsc -p tsconfig.json --noEmit -w
```

## tsconfig behavior

For transform, Playwright supports these key tsconfig fields:
- `allowJs`
- `baseUrl`
- `paths`
- `references`

Recommended structure:

```txt
src/
    source.ts

tests/
    tsconfig.json  # test-specific tsconfig
    example.spec.ts

tsconfig.json  # generic tsconfig for all typescript sources

playwright.config.ts
```

## Path mapping

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "@myhelper/*": ["packages/myhelper/*"]
    }
  }
}
```

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';
import { username, password } from '@myhelper/credentials';

test('example', async ({ page }) => {
  await page.getByLabel('User Name').fill(username);
  await page.getByLabel('Password').fill(password);
});
```

## Tsconfig resolution

Default: nearest `tsconfig.json`/`jsconfig.json` per imported file.

Use specific tsconfig from CLI:

```sh
npx playwright test --tsconfig=tsconfig.test.json
```

Or from config:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tsconfig: './tsconfig.test.json',
});
```

## Manual TypeScript compilation

If you use TS features Playwright cannot transform cleanly, precompile tests.

Tests tsconfig:

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "commonjs",
        "moduleResolution": "Node",
        "sourceMap": true,
        "outDir": "../tests-out"
    }
}
```

Package scripts:

```json
{
  "scripts": {
    "pretest": "tsc --incremental -p tests/tsconfig.json",
    "test": "playwright test -c tests-out"
  }
}
```
