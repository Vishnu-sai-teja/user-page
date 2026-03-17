---
name: carbon-design-system
description: Carbon Design System guide for `carbon-react` with component docs, props, examples, deprecation guidance, and curated references. Use when building, refactoring, or reviewing UI that should use Carbon components and patterns.
---

# Carbon Design System

Guide for building with `carbon-react` using the local Carbon component catalog and reference docs.

## IMPORTANT NOTE

- When reading any file, always read the complete full file.

<workflow>
1) Identify the relevant section in this skill: Foundations, Guidance, Migration, or Component Catalog.
2) Always load `references/docs/recommended-practices.md`.
3) Before writing any UI code, identify the Carbon components needed for the task and read the matching files from `references/components/` for concrete API details, examples, and prop tables.
4) Before writing any UI code, read `references/docs/colors.md` and use Carbon design-system colors and tokens strictly for visual decisions.
5) Load any additional matching docs from `references/docs/` for setup, usage, routing, i18n, styling constraints, or migration.
6) Use Carbon Design System components and patterns strictly for the implementation. Do not introduce custom UI primitives or non-Carbon color systems when an appropriate Carbon option exists.
7) Prefer non-deprecated components. If a component is deprecated or the user asks for migration help, also load `references/docs/deprecation-migration.md`.
8) Strictly load all relevant Carbon resources for the task context before writing any UI code. If a component depends on related parent or child components, read those files too, and implement using Carbon components, patterns, colors, and tokens only where Carbon provides an appropriate option.
</workflow>

## Quick Start

For initial Carbon setup or usage questions:
- `references/docs/installation.md` - install `carbon-react`, required peer dependencies, fonts, and local setup expectations.
- `references/docs/usage.md` - app bootstrap, provider setup, theming, global styles, and import-path rules.

## Foundations

Core docs to load based on task type:

- `references/docs/usage.md` - base app wiring, import rules, global styles, theming, localization, and validation opt-in.
- `references/docs/installation.md` - package install, peer dependencies, design tokens, fonts, and icons.
- `references/docs/recommended-practices.md` - reliability rules for Carbon usage. Always load this file.
- `references/docs/colors.md` - palette colors, design tokens, and component color props.

## Guidance

Load these when the request matches:

- `references/docs/usage-with-routing.md` - using Carbon link-like components with React Router.
- `references/docs/i18n.md` - `I18nProvider`, locale structure, overrides, and translation keys.
- `references/docs/extending-styles-using-styled-components.md` - last-resort styling extension guidance for `styled-components`.

## Migration

- `references/docs/deprecation-migration.md` - replacements and migration patterns for deprecated Carbon components.

## Component Catalog

All component docs live in `references/components/`. Each file contains imports, source info, prop tables, examples, and deprecation flags where applicable.

### Components

- `accordion`, `accordion-group`, `action-popover`, `action-popover-divider`, `action-popover-item`, `action-popover-menu`, `action-popover-menu-button`, `adaptive-sidebar`, `advanced-color-picker`, `alert`, `anchor-navigation`, `anchor-navigation-item`, `anchor-section-divider`
- `badge`, `batch-selection`, `box`, `breadcrumbs`, `button`, `button-bar`, `button-handle-next`, `button-minor`, `button-next`, `button-toggle`, `button-toggle-group`
- `carbon-provider`, `card`, `card-column`, `card-footer`, `card-row`, `checkbox`, `checkbox-group`, `confirm`, `content`, `crumb`
- `date-input`, `date-range`, `dd`, `decimal`, `detail`, `dialog`, `dismissible-box`, `dl`, `draggable-container`, `draggable-item`, `drawer`, `dt`, `duelling-picklist`
- `fieldset`, `file-input`, `filterable-select`, `flat-table`, `flat-table-body`, `flat-table-body-draggable`, `flat-table-cell`, `flat-table-checkbox`, `flat-table-head`, `flat-table-header`, `flat-table-row`, `flat-table-row-header`, `flex-tile-cell`, `flex-tile-container`, `flex-tile-divider`, `form`
- `global-header`, `grid-container`, `grid-item`, `grouped-character`
- `heading`, `help`, `hr`
- `i18n-provider`, `icon`, `icon-button`, `image`, `inline-inputs`
- `link`, `link-preview`, `list`, `list-item`, `loader`, `loader-bar`, `loader-next`, `loader-spinner`, `loader-star`
- `menu`, `menu-divider`, `menu-fullscreen`, `menu-item`, `menu-segment-title`, `message`, `modal`, `multi-action-button`, `multi-select`
- `navigation-bar`, `next-loader`, `note`, `number`, `numeral-date`
- `option`, `option-group-header`, `option-row`
- `page`, `pager`, `pages`, `password`, `picklist`, `picklist-divider`, `picklist-group`, `picklist-item`, `picklist-placeholder`, `pill`, `pod`, `popover-container`, `portal`, `portrait`, `preview`, `profile`, `progress-tracker`
- `radio-button`, `radio-button-group`, `required-fields-indicator`
- `scrollable-block`, `search`, `select`, `settings-row`, `sidebar`, `simple-color`, `simple-color-picker`, `sort`, `split-button`, `step-flow`, `step-flow-title`, `step-sequence`, `step-sequence-item`, `switch`
- `tab`, `tab-list-next`, `tab-next`, `tab-panel-next`, `tabs`, `tabs-handle-next`, `tabs-next`, `text-editor`, `textarea`, `textbox`, `tile`, `tile-content`, `tile-footer`, `tile-header`, `tile-select`, `tile-select-group`, `time`, `toast`, `tooltip`, `typography`
- `vertical-divider`, `vertical-menu`, `vertical-menu-full-screen`, `vertical-menu-item`, `vertical-menu-trigger`

<sources>
- `references/docs/installation.md`
- `references/docs/usage.md`
- `references/docs/recommended-practices.md`
- `references/docs/usage-with-routing.md`
- `references/docs/colors.md`
- `references/docs/i18n.md`
- `references/docs/extending-styles-using-styled-components.md`
- `references/docs/deprecation-migration.md`
- `references/components/*.md`
</sources>

<notes>
Deprecated components are marked in `index.md` and in the corresponding component files under `references/components/`.
Use `index.md` when you want a clickable alphabetical directory, but keep the component list above in mind when deciding what to load.
</notes>
