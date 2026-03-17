---
name: about-me-design
description: Build or refine an About Me page, portfolio, or personal website into a structured editorial personal site with distinct routes for narrative, experience, writing, projects, recommendations, and ongoing inputs.
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
- `Content-to-structure gaps`
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
Read `references/content-structure-gaps.md` before collapsing multiple content types into a single route.
Default to a routed site with:
- `/`
- `/about`
- `/experience`
- `/bookmarks`
- `/recommendations`
- `/writing`
- `/projects`
- detail pages when content supports them

Treat the route-per-nav-item rule as mandatory for primary navigation:
- each top-level nav label must resolve to its own page or route
- do not use primary nav items as anchor links into one long scrolling page
- if a route is omitted because content is insufficient, remove that nav item instead of pointing it to a section on another page

If the user has less content, simplify the route set carefully, but keep the same system logic:
- orientation on home
- narrative on about
- chronology and skills on experience when that material is substantial
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
- `references/pages/experience.md`
- `references/pages/bookmarks.md`
- `references/pages/recommendations.md`
- `references/pages/writing.md`
- `references/pages/projects.md`
- `references/pages/detail-page.md` when detail views are in scope
Do not settle on route structure, page responsibilities, or implementation direction until those relevant page references have been read.

If the route in scope is `/recommendations` and the data is being fetched from public APIs, also load the sibling skill at `../recommendation-api-reference/SKILL.md` so the data flow and the card design are implemented together.

## 5. Execute The Notes Section As Implementation Workflow

Use the sections in `<notes>` as implementation checkpoints, not passive background reading:
- `Outcome`
- `Site Model`
- `Content-Structure Gap Rule`
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

## Content-Structure Gap Rule

When the content contains distinct jobs, do not compress them into a single long page.
If the same page is trying to act as:
- orientation
- biography
- archive
- curation layer
- project index
- reading surface

then the structure is wrong, even if the content itself is good.

Default to multiple routes whenever the content naturally separates into different reading modes.
Use dedicated pages to reduce cognitive load, improve scanning, and preserve a clear information hierarchy.

## Site Model

Prefer a multi-page site with a consistent shell rather than a single-page portfolio.
Treat primary navigation as strict route navigation, not section navigation.

Default route set:
- `/` home
- `/about`
- `/experience`
- `/bookmarks`
- `/recommendations`
- `/writing`
- `/projects`
- per-item detail routes for writing, projects, bookmarks, or recommendations when notes exist

For this repo's recommendation content, treat `/recommendations` as a required dedicated route whenever the user profile includes both book and movie recommendations.
Its structure should be:
- `Book Recommendations` section first
- `Movie Recommendations` section second
- stacked vertical cards in each section
- image-led cards using book covers and movie posters

If a top-level nav item is shown for `home`, `about`, `experience`, `bookmarks`, `recommendations`, `writing`, or `projects`, that nav item must lead to a distinct page or route for that destination.
Do not keep those labels in the navbar if they only scroll to sections inside one long page.

If the user has less content, collapse gracefully, but keep the same mental model:
- home introduces identity and explains the site
- about carries the long-form narrative
- experience holds chronology, role progression, and skills that scan better in structured form
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
- Follow Carbon strictly for spacing, responsive spacing changes, layout rhythm, typography scale, and heading/body hierarchy.
- The UI should feel deliberate and polished through proportion, whitespace, and readable hierarchy, not decorative noise.

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
- `experience` is resume-shaped context, including timelines, role summaries, and skills when they deserve their own scanning surface

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
- Experience: structured timeline, role cards, or compact resume index for chronology, responsibilities, outcomes, and skills
- Writing: searchable archive, optional category tabs, compact table rows
- Projects: search, optional type filter, grid/table toggle, pagination if needed
- Bookmarks: inbox/archive split, utility-first table, direct external links, optional private notes
- Recommendations: a single route with books first and movies below, each rendered as a vertical list of image-led recommendation cards with compact metadata and source links
- Detail pages: narrow reading width, back link, metadata row, optional external CTA, markdown body

## Carbon-First Implementation

Use Carbon components wherever they improve structure and consistency.
Carbon should supply the concrete visual system and component behavior for implementation.

Treat Carbon as a hard constraint, not optional inspiration.
The result should visibly follow Carbon principles for:
- consistent spacing between sections and cards
- larger spacing on wider screens and tighter but still comfortable spacing on smaller screens
- clear heading, subheading, body, caption, and metadata hierarchy
- predictable layout rhythm across index pages and reading pages
- accessible density for tables, filters, navigation, and content blocks

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
- Put timelines, skill inventories, and role-by-role scanning material on `experience` when they would interrupt the reading flow of `about`
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
- `about` and `experience` are separate pages when both narrative and resume-shaped content are present
- The recommendations route is a separate page, not a section on another route
- The recommendations page presents books above movies
- Recommendation items read as vertical cards rather than a dense data table for this repo's content shape
- Long-form pages use a narrower reading width than collection pages
- Filters, tabs, or toggles exist only when the content volume justifies them
- The result feels directly inspired by the Aditi reference without copying exact text
</notes>

<sources>
Page-specific references:
- `references/pages/home.md`
- `references/pages/about.md`
- `references/pages/experience.md`
- `references/pages/writing.md`
- `references/pages/projects.md`
- `references/pages/bookmarks.md`
- `references/pages/recommendations.md`
- `references/pages/detail-page.md`
- `references/content-structure-gaps.md`
</sources>
