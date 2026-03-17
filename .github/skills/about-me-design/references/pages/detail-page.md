# Detail Page Pattern

Model this page on the reference site's reader view for writing, project notes, and recommendation notes.

Purpose:

- provide a focused reading surface for one item
- preserve metadata and context without overwhelming the content

Reference structure:

- back link to the parent collection
- title
- metadata row with date, type, tags, or other key attributes
- optional short description
- optional external `Visit →` CTA
- long-form markdown body in a narrow centered column

Good dynamic behaviors:

- clear back navigation
- external-link affordance for source material
- loading state if content is fetched client-side

Keep it profile-agnostic:

- adapt metadata to the content type
- do not require every detail page to have the same fields
- if an item has no body content, route directly to the external source instead of forcing an empty detail page
