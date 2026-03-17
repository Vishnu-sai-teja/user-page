# Detail Page Pattern

Model this page on the reference site's reader view for writing, project notes, and recommendation notes.

Purpose:

- provide a calm reading surface for one item
- preserve metadata and context without overwhelming the content

Reference structure:

- back link to the parent collection
- title
- metadata row with date, type, tags, or other key attributes
- optional short description
- optional external `Visit →` CTA
- long-form markdown body in a narrow centered column

Design cues:

- use a narrower reading width than the collection pages
- keep the header concise and scannable
- let the body breathe
- make the transition from table/grid views into prose feel natural

Good dynamic behaviors:

- clear back navigation
- external-link affordance for source material
- loading state if content is fetched client-side

Keep it profile-agnostic:

- adapt metadata to the content type
- do not require every detail page to have the same fields
- if an item has no body content, route directly to the external source instead of forcing an empty detail page
