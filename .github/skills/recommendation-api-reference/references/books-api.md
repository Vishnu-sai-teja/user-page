# Books API

Use this reference for titles from `Book Recommendations` in `docs/user-profile.md`.

Source:
- Open Library

No API key is required.

## Input

Start with:

```ts
type BookRecommendationInput = {
  title: string;
  authorHint?: string;
  isbnHint?: string;
};
```

Use `authorHint` for ambiguous titles. Use `isbnHint` only when a specific edition matters.

## Fetch Order

1. Search by title
2. Fetch work details
3. Fetch editions if you need edition metadata or missing cover data
4. Fetch `api/books` by ISBN only when you need a direct cover URL or richer edition data
5. Fetch author details only for optional enrichment

## 1. Search

Endpoint:

```text
GET https://openlibrary.org/search.json
```

Recommended query:
- `title=<book title>`
- `limit=10`
- `fields=key,title,author_name,first_publish_year,edition_count,cover_i,isbn`
- optional `author=<authorHint>`

Example:

```text
https://openlibrary.org/search.json?title=The+Lord+of+the+Rings&author=J.R.R.+Tolkien&limit=10&fields=key,title,author_name,first_publish_year,edition_count,cover_i,isbn
```

Extract from `docs[n]`:
- `key`
- `title`
- `author_name`
- `first_publish_year`
- `edition_count`
- `cover_i`
- `isbn`

Keep:
- `workKey`
- first useful ISBN
- cover id if present

## 2. Work Details

Endpoint:

```text
GET https://openlibrary.org/works/<work_key>.json
```

Extract:
- `title`
- `description`
- `authors`
- `subjects`
- `covers`
- `first_publish_date`

Use this call for the main description and work-level metadata.

## 3. Editions

Endpoint:

```text
GET https://openlibrary.org/works/<work_key>/editions.json
```

Useful query params:
- `limit`
- `offset`

Extract from `entries[n]`:
- `publish_date`
- `publishers`
- `number_of_pages`
- `isbn_10`
- `isbn_13`
- `covers`

Use editions for:
- pages
- publisher
- fallback ISBNs
- fallback covers

## 4. Books API by ISBN

Endpoint:

```text
GET https://openlibrary.org/api/books
```

Recommended query:
- `bibkeys=ISBN:<isbn>`
- `jscmd=data`
- `format=json`

Extract:
- `title`
- `authors`
- `publish_date`
- `publishers`
- `number_of_pages`
- `cover.small`
- `cover.medium`
- `cover.large`

Prefer this endpoint when the card needs a direct cover URL.

## 5. Author Details

Endpoint:

```text
GET https://openlibrary.org/authors/<author_key>.json
```

Extract only if needed:
- `name`
- `birth_date`
- `death_date`
- `bio`

Do not block card rendering on author lookups if search already gives the author names.

## Cover URLs

Patterns:

```text
GET https://covers.openlibrary.org/b/id/<cover_id>-L.jpg
GET https://covers.openlibrary.org/b/isbn/<isbn>-L.jpg
```

Sizes:
- `S`
- `M`
- `L`

## Normalize To

Map the result into the schemas from `recommendation-schemas.md`, not directly into UI components.

Primary book card fields:
- `title`
- `creator`
- `year`
- `description`
- `imageUrl`
- `sourceUrl`
- `metadata`

Useful metadata rows:
- `Author`
- `First published`
- `Edition count`
- `Pages`
- `Publisher`

Suggested mapping:
- `creator` <- `author_name`
- `year` <- `first_publish_year` or `first_publish_date`
- `description` <- work `description`
- `imageUrl` <- `cover.large`, then cover id URL, then ISBN cover URL; resize the chosen image before use in the UI
- `sourceUrl` <- `https://openlibrary.org${workKey}`

## Minimal Good Path

For most books:
1. search
2. work details
3. editions or `api/books` only if image or edition data is missing
