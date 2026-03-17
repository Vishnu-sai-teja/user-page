# Content-To-Structure Gaps

Use this file when the content is being pushed into a single-page portfolio shape even though the material has multiple distinct jobs.
Treat it as a hard check before deciding the route map.

## Core rule

When content has different reading modes, give those modes different pages.
Do not solve a structural problem with better styling.
Do not keep adding sections to one page when the content already wants:
- an orientation page
- a narrative page
- an archive page
- a curation page
- a project index
- a reading/detail page

If the content needs different scanning behaviors, metadata patterns, or reading widths, it should not stay on one page.

## Typical gap between content and structure

The content often contains:
- a personal introduction
- a deeper story or philosophy
- a career timeline, resume facts, or skills inventory
- projects with metadata
- writing with dates and categories
- bookmarks or saved references
- recommendations with stronger editorial judgment

The structure often collapses all of that into:
- one hero
- one about section
- one project strip
- one writing strip
- one contact footer

That collapse removes clarity.
It weakens scanning, makes updates harder, and forces every content type into the same visual density.

## When a single page is wrong

A single-page layout is the wrong default when any of these are true:
- the user has more than one meaningful content stream
- writing, projects, bookmarks, or recommendations need filtering or search
- the about content reads better as an essay than as a section block
- some content is meant for quick scanning while other content is meant for deep reading
- the page starts repeating headings like `projects`, `writing`, `notes`, and `recommendations` as stacked home sections
- mobile requires too much scrolling before users understand how the site works

## Recommended page split

Use this default route model:
- `/` for identity and orientation
- `/about` for narrative and values
- `/experience` for chronology, skills, and resume-shaped context
- `/writing` for authored output
- `/projects` for built work
- `/bookmarks` for active inputs
- `/recommendations` for durable curation
- detail pages for individual items when notes or body content exist

Each page should have one dominant job:
- `home` explains the system
- `about` deepens the person
- `experience` supports fast professional scanning
- `writing` helps scanning and retrieval
- `projects` supports browsing and comparison
- `bookmarks` tracks live inputs
- `recommendations` shows conviction and taste
- detail pages support uninterrupted reading

## Carbon design requirements

Follow Carbon design principles strictly.
This is not optional polish layered on top of structure.
Carbon should govern:
- component choice
- layout rhythm
- spacing scale
- responsive spacing adjustments
- typography hierarchy
- table and filter density
- navigation patterns
- interaction states

Use Carbon to make the multi-page system feel coherent and beautiful through order, proportion, and restraint.

## Spacing and hierarchy requirements

The final UI and documentation should feel intentionally composed.
Require:
- generous section spacing on desktop
- reduced but still comfortable spacing on tablet and mobile
- stronger separation between page-level regions than between elements inside a region
- visible hierarchy between page title, section title, supporting copy, metadata, and utility labels
- readable line lengths for essays and detail pages
- wider containers for archive and collection pages
- narrower reading columns for long-form text

Do not accept:
- uniform spacing everywhere
- cramped mobile layouts
- oversized desktop whitespace with weak grouping
- heading levels that look too similar
- body text and metadata that compete for attention

## Decision test

Before choosing a single-page solution, ask:

1. Are multiple content types doing different jobs?
2. Do some sections need archive behavior while others need narrative reading?
3. Would separate pages improve clarity more than another stacked homepage section?

If the answer is yes to any of these, split the site into multiple pages.

## Writing instruction for future implementations

When using this skill, explicitly state that the implementation must:
- avoid collapsing rich content into one long page
- separate major content streams into dedicated routes
- follow Carbon design principles strictly
- use responsive spacing that adapts to screen size
- preserve strong font hierarchy and readable content rhythm
- present the system in a polished, editorial way rather than a template-like portfolio way
