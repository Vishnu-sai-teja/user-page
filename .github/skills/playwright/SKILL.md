---
name: playwright
description: "Comprehensive Playwright testing framework guide. Provides setup, test writing, configuration, debugging tools, and best practices. Use when building browser automation tests, configuring test environments, debugging test failures, or implementing E2E testing strategies."
---

# Playwright Testing Skill

Guide for browser automation testing with Playwright. Covers setup, test development, configuration, and debugging.

## IMPORTANT NOTE

- When reading any file, always read the complete full file.

<workflow>
1) Identify the relevant section in this skill (Foundations, Configuration, Test Features, or Tools & Debugging).
2) From that section, locate the matching file(s) and open them.
3) Always load `resources/foundations/best-practices.md` in addition to any other selected files.
4) Load **all relevant resources** for the task context. Do not cap the number of files when they are relevant.
5) Read the selected file(s) completely before drafting a response or making edits.
</workflow>

## Quick Start

For first time setup or first phase:
- **resources/foundations/intro.md** - Installation, system requirements, versioning
  - Core points:
    - Update Playwright and browser binaries using your package manager (`npm`, `yarn`, or `pnpm`).
    - Verify installed Playwright version via the CLI.
    - Check system requirements (Node.js versions and supported OSes).

## Foundations

Learn core testing concepts:

- **resources/foundations/intro.md** - Installation & setup. Use when updating Playwright or checking system requirements.
  - Core points:
    - Install/update Playwright and download browser binaries with `--with-deps`.
    - Use `playwright --version` to confirm the installed version.
    - Validate platform and Node.js support before running tests.
- **resources/foundations/writing-tests.md** - How to write your first test. Use when creating new test files or learning test syntax.
  - Core points:
    - Write tests using actions + assertions with small, readable flows.
    - Use resilient locator patterns and web-first assertions.
    - Organize tests with hooks/groups while preserving isolation.
- **resources/foundations/running-tests.md** - Execute tests locally and in CI. Use when running tests, understanding test modes, or debugging test execution.
  - Core points:
    - Run all tests or subsets via `npx playwright test` with filters and flags.
    - Debug with UI Mode or Inspector and integrate with VS Code.
    - Use the HTML report to review runs and open traces.
- **resources/foundations/best-practices.md** - Testing patterns and anti-patterns. Use when designing test architecture or optimizing test reliability.
  - Core points:
    - Focus on user-visible behavior and resilient locators.
    - Keep tests isolated; use setup projects or `beforeEach` for shared prep.
    - Use web-first assertions and Playwright tooling (codegen, trace, UI mode).
- **resources/foundations/library.md** - TypeScript support in the Playwright library. Use when adding type checks or TS typing to tests or scripts.
  - Core points:
    - TypeScript works out of the box with Playwright.
    - Use `// @ts-check` or JSDoc types in JavaScript for type safety.
    - Explicitly import types when needed for clarity.

## Configuration

Configure test environments and projects:

- **resources/configuration/test-configuration.md** - Core config file setup (playwright.config.js). Use when initializing projects or setting base configuration.
  - Core points:
    - Set top-level config options like `testIgnore`, `testMatch`, and `timeout`.
    - Configure output directories and global setup/teardown hooks.
    - Tune `expect` timeouts and screenshot/snapshot tolerances.
- **resources/configuration/test-use-options.md** - Browser context options (viewport, auth, etc). Use when configuring browser behavior or test contexts.
  - Core points:
    - Use `use` for shared defaults (`baseURL`, `storageState`, emulation, recording).
    - Override at project/file/describe scope only when necessary.
    - Keep artifact and timeout settings lean by default.
- **resources/configuration/test-projects.md** - Multi-project setups. Use when running tests across browsers (Chrome, Firefox, Safari) or multiple environments.
  - Core points:
    - Define projects to cover browsers, devices, and environments.
    - Run specific projects via `--project` and coordinate dependencies.
    - Use setup/teardown projects for shared global prep.
- **resources/configuration/test-global-setup-teardown.md** - Global setup/teardown hooks. Use when sharing state across tests or setting up resources before test runs.
  - Core points:
    - Prefer project dependencies for setup/teardown (traces, fixtures, reporting).
    - `globalSetup`/`globalTeardown` runs once but with limited features.
    - Use `--no-deps` to skip dependency projects when filtering tests.
- **resources/configuration/test-typescript.md** - TypeScript integration. Use when building type-safe tests.
  - Core points:
    - Compile tests manually when Playwright’s TS transform isn’t sufficient.
    - Configure `tsconfig.json` in tests and output to `tests-out`.
    - Use `pretest` and `test` scripts to build then run compiled tests.

## Test Features

Advanced test capabilities:

- **resources/test-features/test-fixtures.md** - Reusable test fixtures. Use when extracting common setup or creating custom fixtures for tests.
  - Core points:
    - Define custom fixtures with `base.extend` and reuse setup logic.
    - Scope fixtures per test or worker depending on lifecycle needs.
    - Use fixtures to share state safely without leaking across tests.
- **resources/test-features/test-assertions.md** - Available assertions and matchers. Use when writing assertions or validating test expectations.
  - Core points:
    - Use web-first `expect` APIs that wait and retry for conditions.
    - Prefer locator-based assertions for visibility, text, and state.
    - Tune assertion timeouts in config or per assertion.
- **resources/test-features/test-retries.md** - Automatic test retries for flaky tests. Use when handling intermittent failures.
  - Core points:
    - Configure retries via CLI or `retries` in config.
    - Use `testInfo.retry` to handle retries at runtime.
    - Use serial mode sparingly; prefer isolated tests.
- **resources/test-features/test-timeouts.md** - Timeout configuration and handling. Use when tests hang or need custom wait times.
  - Core points:
    - Configure timeouts for test, expect, action, navigation, and global runs.
    - Override timeouts at test, hook, or action level when needed.
    - Use `test.slow()` to safely extend test timeouts.
- **resources/test-features/test-parallel.md** - Parallel test execution. Use when optimizing test performance.
  - Core points:
    - Run tests in parallel by default to reduce runtime.
    - Use `test.describe.configure` to control mode where needed.
    - Split large suites into shards or projects for faster CI.
- **resources/test-features/test-annotations.md** - Test tags, skipping, and metadata. Use when organizing tests or conditional execution.
  - Core points:
    - Use `test.skip`, `test.fail`, `test.fixme`, and `test.slow` for control.
    - Tag tests with `@tag` or `{ tag: '@fast' }` for filtering.
    - Group tests with `test.describe` and use `test.only` sparingly.

## Tools & Debugging

Troubleshoot and monitor tests:

- **resources/tools-and-debugging/test-ui-mode.md** - Interactive UI mode for debugging. Use when visually debugging tests or stepping through test execution.
  - Core points:
    - UI Mode provides timeline, actions, network, console, and trace views.
    - Filter tests by text, tag, status, or project and enable watch mode.
    - Use locator picker to validate and copy stable locators.
- **resources/tools-and-debugging/trace-viewer-intro.md** - Trace viewer for test recordings. Use when analyzing test failures or understanding test flow.
  - Core points:
    - Open reports with `npx playwright show-report`.
    - Filter and inspect test results, steps, and traces in the HTML report.
    - Use trace view to debug failed actions and timing.
- **resources/tools-and-debugging/test-reporters.md** - Test report formats (HTML, JSON, etc). Use when generating test reports or integrating with CI systems.
  - Core points:
    - Configure reporters via CLI or `playwright.config.ts`.
    - Use HTML, JSON, JUnit, or GitHub reporters for CI integrations.
    - Customize reporter options like output files and open behavior.
- **resources/tools-and-debugging/api-testing.md** - API testing with Playwright. Use when testing backend APIs without UI.
  - Core points:
    - Use the `request` fixture for API tests with shared `baseURL` and headers.
    - Create and dispose `APIRequestContext` for setup/teardown or scripts.
    - Mix API calls with UI actions to validate pre/postconditions.
- **resources/tools-and-debugging/mock-browser.md** - Mocking browser APIs. Use when simulating device/browser APIs or isolating client logic.
  - Core points:
    - Use `page.addInitScript` to mock browser APIs before page load.
    - Validate API calls with `page.exposeFunction` and custom logging.
    - Update mocks dynamically to simulate state changes in tests.

## Resource Location

All resources are in `resources/` organized by category:
- `resources/foundations/` - Getting started
- `resources/configuration/` - Setup and configuration
- `resources/test-features/` - Testing capabilities
- `resources/tools-and-debugging/` - Debugging and reporting

<sources>
- resources/foundations/intro.md: Installation, system requirements, versioning.
- resources/foundations/writing-tests.md: Writing tests with actions, locators, assertions, and hooks.
- resources/foundations/running-tests.md: Running tests locally and in CI, test modes, and reports.
- resources/foundations/best-practices.md: Testing patterns, reliability guidance, and anti-patterns.
- resources/foundations/library.md: Playwright library usage and TypeScript support.
- resources/configuration/test-configuration.md: Core Playwright config structure and global settings.
- resources/configuration/test-use-options.md: `use` options for browser/context behavior and overrides.
- resources/configuration/test-projects.md: Multi-project setups across browsers/devices/environments.
- resources/configuration/test-global-setup-teardown.md: Global setup/teardown and dependency projects.
- resources/configuration/test-typescript.md: TypeScript build and config for Playwright tests.
- resources/test-features/test-fixtures.md: Custom fixtures and shared setup patterns.
- resources/test-features/test-assertions.md: Assertion APIs and matcher usage.
- resources/test-features/test-retries.md: Retries configuration and handling flaky tests.
- resources/test-features/test-timeouts.md: Timeout types and overrides.
- resources/test-features/test-parallel.md: Parallel execution and sharding.
- resources/test-features/test-annotations.md: Tags, skips, and test metadata.
- resources/tools-and-debugging/test-ui-mode.md: UI mode for interactive debugging.
- resources/tools-and-debugging/trace-viewer-intro.md: Trace viewer and failure analysis.
- resources/tools-and-debugging/test-reporters.md: Reporter formats and configuration.
- resources/tools-and-debugging/api-testing.md: API testing with the request fixture.
- resources/tools-and-debugging/mock-browser.md: Mocking browser APIs and behaviors.
</sources>

## Agent Invocation

When a task clearly requires specialized automation, explicitly invoke the relevant agent(s) listed for this repository and follow their instructions before proceeding.
