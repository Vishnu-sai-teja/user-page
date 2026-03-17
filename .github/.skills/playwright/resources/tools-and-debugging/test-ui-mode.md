---
id: test-ui-mode
title: "UI Mode"
---

## Introduction

UI Mode provides a time-travel debugging experience for Playwright tests. Run, filter, watch, and inspect tests with full traces — step through each action, view DOM snapshots, console logs, network requests, and diffs for visual comparisons.

```bash
npx playwright test --ui
```

## Key panels

| Panel | What it shows |
|---|---|
| **Sidebar** | All test files. Run all, one file, one describe, or one test. Watch-mode eye icon per test. |
| **Timeline** | Color-coded action timeline. Hover to see DOM snapshots. Drag slider to filter logs. |
| **Actions** | Locator and duration per action. Before/after DOM tabs. |
| **Source** | Highlighted line for each hovered action. "Open in VSCode" button. |
| **Call** | Locator, timing, strict mode flags for the selected action. |
| **Log** | Full Playwright internal log (scrolling, waiting, clicks, fills…). |
| **Errors** | Error messages per test; red line in timeline marks error location. |
| **Console** | Browser + test console logs with origin icons. |
| **Network** | All requests: status, method, type, duration, size. Click for headers/body. |
| **Attachments** | Screenshots, video, visual diff sliders for snapshot comparisons. |
| **Metadata** | Browser, viewport, test duration. |

## Filtering tests

Filter by: text, `@tag`, status (passed/failed/skipped), or project. If using project dependencies, run setup tests manually first — UI Mode does not auto-run them.

## Pick locator

Click **Pick Locator**, hover the DOM snapshot to highlight elements, click to copy to clipboard. Edit and validate the locator in the playground before pasting into your test.

## Watch mode

Click the eye icon next to a test (or the top-level eye icon for all tests) to re-run automatically when the file changes.

## Docker / GitHub Codespaces

```bash
npx playwright test --ui-host=0.0.0.0            # expose for browser access
npx playwright test --ui-host=0.0.0.0 --ui-port=8080
```

> **Security note:** `--ui-host=0.0.0.0` exposes traces and secrets to all machines on your network. In Codespaces, ports are account-restricted by default.
