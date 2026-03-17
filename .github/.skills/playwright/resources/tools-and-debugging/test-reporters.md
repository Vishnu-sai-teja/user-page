---
id: test-reporters
title: "Reporters"
---

## Introduction

Set a reporter via CLI or config. Multiple reporters can run simultaneously.

```bash
npx playwright test --reporter=line
```

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Single reporter
  reporter: process.env.CI ? 'dot' : 'list',

  // Multiple reporters
  // reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],

  // GitHub Actions annotations
  // reporter: process.env.CI ? 'github' : 'list',
});
```



## Built-in reporters

| Reporter | CLI flag | Description | Default |
|---|---|---|---|
| `list` | `--reporter=list` | One line per test | Local runs |
| `line` | `--reporter=line` | Single overwritten line; inline failures | — |
| `dot` | `--reporter=dot` | One char per test (`·` pass, `F` fail, `±` flaky) | CI |
| `html` | `--reporter=html` | Self-contained HTML report in `playwright-report/` | — |
| `blob` | `--reporter=blob` | Binary archive for merging sharded reports | — |
| `json` | `--reporter=json` | Full JSON output | — |
| `junit` | `--reporter=junit` | JUnit-style XML | — |
| `github` | — | GitHub Actions annotations on failures | — |

### HTML reporter options

```js
reporter: [['html', {
  open: 'on-failure',        // 'always' | 'never' | 'on-failure'
  outputFolder: 'my-report', // default: playwright-report
}]],
```

```bash
npx playwright show-report           # open last report
npx playwright show-report my-report # open custom folder
```

Key env vars: `PLAYWRIGHT_HTML_OPEN`, `PLAYWRIGHT_HTML_OUTPUT_DIR`, `PLAYWRIGHT_HTML_PORT`

### Blob reporter options

Used primarily for merging sharded reports. Output: `blob-report/report-<hash>.zip`

```js
reporter: [['blob', { outputDir: 'blob-report', fileName: 'report.zip' }]],
```

### JSON reporter options

```js
reporter: [['json', { outputFile: 'results.json' }]],
```

Or via env: `PLAYWRIGHT_JSON_OUTPUT_NAME=results.json npx playwright test --reporter=json`

### JUnit reporter options

```js
reporter: [['junit', { outputFile: 'results.xml', includeProjectInTestName: true }]],
```

Or via env: `PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml npx playwright test --reporter=junit`

### List reporter: step output

```js
reporter: [['list', { printSteps: true }]],
```



## Custom reporters

Implement the `Reporter` interface and point the config to the file:

```js title="my-reporter.ts"
import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting ${suite.allTests().length} tests`);
  }
  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`${test.title}: ${result.status}`);
  }
  onEnd(result: FullResult) {
    console.log(`Run finished: ${result.status}`);
  }
}

export default MyReporter;
```

```js title="playwright.config.ts"
export default defineConfig({ reporter: './my-reporter.ts' });
```


