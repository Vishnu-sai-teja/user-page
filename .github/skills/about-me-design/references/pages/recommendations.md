# Recommendations Page Pattern

Use this pattern for this repo when the user profile contains both book and movie recommendations and the application needs one dedicated recommendations route.

Purpose:

- separate curated recommendations from bookmarks and raw link saving
- communicate taste through strong, image-led recommendation cards
- make books and movies readable as two related but distinct sections

Required page structure:

- one `/recommendations` page
- page title and one-line positioning sentence
- `Book Recommendations` section first
- vertical list of book cards
- `Movie Recommendations` section below
- vertical list of movie cards

Required content structure:

- do not mix books and movies into one undifferentiated stream
- do not collapse the page into a metadata table for this repo's current recommendation volume
- do not place recommendations as a subsection of `about` or `home`

Card model:

- portrait cover or poster at the top
- title
- creator line such as author or director
- short description or extract
- compact metadata list
- source link

Helpful metadata for books:

- author
- first published year
- edition count
- publisher
- page count
- subjects when compact enough

Helpful metadata for movies:

- director
- release year
- runtime
- genre
- language
- country

Good dynamic behaviors:

- preserve the order from the user profile by default
- render placeholders for missing images
- show only the metadata that is actually fetchable for that item
- add search or filters only if the collection grows beyond the current small curated list

Avoid:

- horizontal carousels
- masonry layouts
- generic portfolio cards with no metadata
- mixing recommendation-specific content with bookmarks behavior
