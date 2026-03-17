---
name: about-me-design
description: Build or refine an About Me page, portfolio, or personal website into a structured editorial personal site with distinct routes for narrative, writing, projects, recommendations, and ongoing inputs.
---

# About Me Design

<workflow>
Use this skill when the user asks for an about-me page, personal portfolio, personal homepage, or a site refresh that should behave like a structured personal site instead of a static resume.

Follow this workflow instead of treating the design guidance as optional reference:

## 1. Read The Design Workflow First

Start with `references/design-principles.md`.
Use its subsections as the source of truth for direction and sequencing:
- `Core model`
- `Carbon design system`
- `Multi-page design system`
- `Structural rules`
- `Content rules`
- `What to borrow`
- `What to avoid`

## 2. Load Carbon With This Skill

Load this skill together with the sibling Carbon catalog at `../carbon-design-system/index.md`.
Use Carbon for all concrete visual and component decisions, including palette, typography, spacing, motion, borders, interaction states, and layout primitives.
Use this skill to decide the editorial shell, route roles, content model, and tone.

## 3. Build The Multi-Page System Before Presentation Decisions

Apply the multi-page design system from `references/design-principles.md` before working on presentation details.
Default to a routed site with:
- `/`
- `/about`
- `/bookmarks`
- `/recommendations`
- `/writing`
- `/projects`
- detail pages when content supports them

If the user has less content, simplify the route set carefully, but keep the same system logic:
- orientation on home
- narrative on about
- active inputs in bookmarks
- curated taste in recommendations
- authored output in writing
- built work in projects

## 4. Use Page References As Route Playbooks

If you are building a specific route or section, read the matching page reference in `references/pages/`.
Treat each page reference as a route-specific playbook layered on top of the main design workflow.
Before coming to a conclusion about the information architecture or writing any code, read all page references relevant to the routes you plan to ship.
If you are designing or revising the site as a system rather than a single isolated route, read all core page references first:
- `references/pages/home.md`
- `references/pages/about.md`
- `references/pages/bookmarks.md`
- `references/pages/recommendations.md`
- `references/pages/writing.md`
- `references/pages/projects.md`
- `references/pages/detail-page.md` when detail views are in scope
Do not settle on route structure, page responsibilities, or implementation direction until those relevant page references have been read.

## 5. Execute The Notes Section As Implementation Workflow

Use the sections in `<notes>` as implementation checkpoints, not passive background reading:
- `Outcome`
- `Site Model`
- `Shell To Preserve`
- `Presentation Boundaries`
- `Content Strategy`
- `Data Model Bias`
- `Route Behaviors To Reuse`
- `Carbon-First Implementation`
- `Content Guidance`
- `Implementation Boundaries`
- `Delivery Checklist`
</workflow>

<notes>
## Outcome

Build a site that feels:
- editorial
- authored
- intellectually serious
- personal but not confessional
- dynamic because the content model is alive, not because the UI is busy

The primary inspiration is the reference site at `ad6190.github.io/aditibhatnagar`.
Treat that site as the canonical model for page relationships, navigation behavior, tone, and content strategy.

## Site Model

Prefer a multi-page site with a consistent shell rather than a single-page portfolio.

Default route set:
- `/` home
- `/about`
- `/bookmarks`
- `/recommendations`
- `/writing`
- `/projects`
- per-item detail routes for writing, projects, bookmarks, or recommendations when notes exist

If the user has less content, collapse gracefully, but keep the same mental model:
- home introduces identity and explains the site
- about carries the long-form narrative
- bookmarks captures active inputs
- recommendations captures durable taste
- writing is the authored archive
- projects is the build log or case-study index

Do not fall back to:
- one long resume page
- a hero plus generic cards
- a portfolio that has no evolving content streams

## Shell To Preserve

- Sticky top navigation
- Clear route labels
- Simple wordmark or site title
- Wide desktop container for index pages
- Narrow reading column for long-form pages
- Simple footer with a small system note or build note

## Presentation Boundaries

- Use this skill only to preserve structural and editorial intent.
- Take color, typography, spacing, motion, component styling, and interaction treatment from the sibling Carbon design system skill.
- Preserve the distinction between collection pages and reading pages, but let Carbon define the concrete visual treatment.
- Keep presentation subordinate to content scanning, route clarity, and reading flow.

## Content Strategy

Lead with identity and point of view, then explain how the site works.

The homepage should not try to summarize every career detail.
Its job is:
- name
- current role or positioning
- one sharp thesis sentence
- a link into `about`
- a second column that explains the content streams and how to navigate them

Distinguish content types clearly:
- `bookmarks` are live inputs, inboxes, saved links, or things being processed
- `recommendations` are high-conviction endorsements
- `writing` is authored output
- `projects` is built work
- `about` is narrative context

This distinction is the core of the reference site's usefulness. Keep it.

## Data Model Bias

When the stack allows it, prefer content-backed collections over hard-coded marketing sections.
The reference site is effectively driven by a manifest plus markdown files.

Good fits:
- markdown, mdx, JSON, or CMS-backed collections
- generated detail pages
- metadata-driven tables, tabs, filters, and tags

## Route Behaviors To Reuse

- Home: large hero plus a right-rail explainer titled like "how this place works"
- About: long-form markdown/article page with values and personal context
- Writing: searchable archive, optional category tabs, compact table rows
- Projects: search, optional type filter, grid/table toggle, pagination if needed
- Bookmarks: inbox/archive split, utility-first table, direct external links, optional private notes
- Recommendations: stronger curation layer, search plus type/tag filtering, sortable table, optional note link plus source link
- Detail pages: narrow reading width, back link, metadata row, optional external CTA, markdown body

## Carbon-First Implementation

Use Carbon components wherever they improve structure and consistency.
Carbon should supply the concrete visual system and component behavior for implementation.

Good candidates:
- navigation: `NavigationBar`, `AnchorNavigation`, `Tabs`, `Link`
- layout: `Box`, `Card`, `Tile`, `FlexTileContainer`, `Sidebar`
- content: `Typography`, `Pill`, `Badge`, `Image`, `Portrait`, `Profile`
- structured data: `FlatTable`, `Pager`, `Accordion`
- controls for dynamic views: `Search`, `Select`, `MultiSelect`

Before importing a component, check the Carbon catalog and prefer non-deprecated options where available.

## Content Guidance

- Lead with identity, direction, and taste, not a wall of chronology
- Keep hero copy short and exact
- Write `about` like an essay, not a bio database
- Let bookmarks and recommendations communicate taste through curation
- Let writing and projects feel maintained, not frozen
- Use experience and skills only where they help the story
- Make contact intentional; do not force a loud contact section if simple links are enough

## Implementation Boundaries

- Favor route clarity, hierarchy, and reading flow over generic portfolio section stacking.
- Ensure the shell works cleanly on mobile, especially nav collapse and dense tables.
- Let Carbon determine the visual specifics needed to express the structure cleanly.

## Delivery Checklist

- The site reads like a maintained personal product, not a portfolio template
- The homepage explains the whole site, not just the person
- `bookmarks` and `recommendations` are distinct in purpose
- Long-form pages use a narrower reading width than collection pages
- Filters, tabs, or toggles exist only when the content volume justifies them
- The result feels directly inspired by the Aditi reference without copying exact text
</notes>

<sources>
Page-specific references:
- `references/pages/home.md`
- `references/pages/about.md`
- `references/pages/writing.md`
- `references/pages/projects.md`
- `references/pages/bookmarks.md`
- `references/pages/recommendations.md`
- `references/pages/detail-page.md`
</sources>
