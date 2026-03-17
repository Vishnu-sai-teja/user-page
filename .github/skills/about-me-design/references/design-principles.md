# Design Principles

Use these principles to shape the site after the Aditi Bhatnagar reference.
Treat this file as the primary design workflow for the skill.

Core model:

- Treat the site as a structured personal product, not a resume page with decoration.
- Use a persistent shell with a sticky header, a simple site label, and clear route destinations.
- Treat primary navigation as route navigation: each top-level nav label must lead to its own distinct page or route, not to an anchor section on a single long page.
- Let the homepage orient the visitor to the whole system, not just the person.
- Separate narrative, inputs, outputs, and curation into different routes.
- Make the site feel alive through content updates and clean interaction details, not novelty UI.

Carbon design system:

- Follow the sibling Carbon design system skill for component choice, implementation details, and all concrete visual decisions.
- Use Carbon for palette, typography, spacing, motion, borders, interaction states, and component treatment.
- Prefer Carbon navigation, tabs, table, search, badge, pill, link, and layout primitives over ad hoc UI.
- Use this skill to define structure and route responsibilities; use Carbon to define how those structures should look and behave.
- Follow Carbon spacing and typography rigorously so the result has responsive whitespace, clear font hierarchy, and consistent visual rhythm across screen sizes.

Multi-page design system:

- Prefer a true multi-page information architecture over a single long portfolio page.
- Use a shared shell across routes: sticky header, route links, wide collection layouts, narrow reading layouts, and a quiet footer.
- Default route set is `home`, `about`, `experience`, `bookmarks`, `recommendations`, `writing`, `projects`, plus detail pages when content supports them.
- Give each major content stream its own dedicated page or route: `home`, `about`, `experience`, `bookmarks`, `recommendations`, `writing`, and `projects` should exist as separate pages when the content supports them.
- If a primary navigation item exists for one of these content streams, it must open a distinct page or route for that stream.
- Do not implement primary navigation as in-page anchor jumps across one catch-all document.
- Each route should have a distinct job in the system and should not duplicate the others.
- Do not collapse these into one catch-all page when the goal is an editorial multi-page site.
- When content is limited, reduce the number of routes only if needed, but preserve the system mindset: orientation, narrative, inputs, outputs, curation.

Content-to-structure gaps:

- When content types have different jobs, do not force them into one stacked page.
- If the same page tries to be a landing page, about page, writing archive, project index, and curation surface, the structure is wrong.
- Use separate routes when content needs different reading widths, metadata patterns, or interaction models.
- Read `references/content-structure-gaps.md` before choosing a single-page solution.
- Solve structural overload by splitting pages, not by adding more sections or styling.

Structural rules:

- Home should be a two-part landing view: identity on one side and a "how this place works" explainer on the other.
- About should read like a long-form essay.
- Experience should behave like a structured professional index rather than a prose essay when chronology and skills are substantial.
- Writing, projects, bookmarks, and recommendations should behave like archives or indexes.
- Detail pages should provide a focused reading surface with strong metadata and clear back navigation.

Content rules:

- Lead with a one-line thesis, not a paragraph of summary.
- Explain the logic of the site in plain language.
- Distinguish "what I am consuming" from "what I recommend."
- Distinguish "what I write" from "what I build."
- Favor honest, specific copy over polished personal-brand language.

What to borrow:

- six-route editorial shell
- seven-route editorial shell when narrative and resume-shaped content both matter
- Carbon-backed multi-page structure
- hero plus orientation rail
- markdown/article-style about page
- dedicated experience page for timeline, role summaries, and skills
- archive-like writing page with search and lightweight grouping
- utility-heavy bookmarks page
- curated recommendations page with stronger metadata
- projects page that supports both visual and dense scanning
- narrow detail view with optional external `Visit` action

What to avoid:

- resume-dump layouts
- one-page portfolios pretending to be multi-page systems
- social-proof sections and fake metrics
- dashboard controls without enough content to justify them
- literal copying of the reference site's personal text
