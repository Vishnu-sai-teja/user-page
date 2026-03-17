# Recommendations Page Pattern

Model this page on the reference site's recommendations route: a more deliberate and metadata-rich layer than bookmarks.

Purpose:

- separate high-signal recommendations from raw bookmarks
- communicate taste through deliberate curation

Reference structure:

- page title and positioning sentence
- search input
- type pills across the top when multiple media types exist
- optional tag filter select
- result count
- divider before the table
- sortable table with title, type, creator, tags, year, date added, and links
- optional internal note icon plus external source icon

Helpful metadata:

- title
- type
- creator or author
- tags
- year
- date added or last updated

Good dynamic behaviors:

- search
- tag filters
- sortable columns when the dataset is large enough
- pagination if the collection grows
- row click-through when notes exist

Keep it profile-agnostic:

- do not assume specific media types
- do not force ratings, scores, or reviews if they do not exist
- if the user has only one recommendation type, remove the extra control row
