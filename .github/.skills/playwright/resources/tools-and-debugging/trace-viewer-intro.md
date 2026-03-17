---
id: trace-viewer-intro
title: "Trace viewer"
---

import LiteYouTube from '@site/src/components/LiteYouTube';

## Introduction

Trace Viewer lets you replay test steps and inspect UI state, logs, network, console, and errors per step.

<LiteYouTube
    id="yP6AnTxC34s"
    title="Viewing Playwright Traces"
/>

## Record traces

Recommended config: retries on CI + `trace: 'on-first-retry'`.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
export default defineConfig({
  retries: process.env.CI ? 2 : 0, // set to 2 when running on CI
  // ...
  use: {
    trace: 'on-first-retry', // record traces on first retry of each test
  },
});
```

Force local trace capture:

```bash
npx playwright test --trace on
```

## Open report

```bash
npx playwright show-report
```

From HTML report:
- click trace icon near failed test, or
- open test detail and open trace from Traces section.

## Use the trace viewer effectively

- move step-by-step on timeline
- inspect snapshots before/after each action
- check network, console, source, and errors
- use DOM snapshot + DevTools for deep inspection

## What's next

- Run tests on CI
- Learn full trace-viewer reference
