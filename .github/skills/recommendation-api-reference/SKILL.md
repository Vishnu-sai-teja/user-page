---
name: recommendation-api-reference
description: Build recommendation fetching and rendering for this repo's About Me app. Use when the user profile contains book and movie recommendations and you need to fetch public metadata, normalize it, and render a dedicated recommendations page with books first and movies second.
---

# Recommendation API Reference

Use this skill when implementing the `/recommendations` route for this repo.

## Repo Contract

- Source titles come from `docs/user-profile.md`
- Books use Open Library
- Movies use Wikipedia search/summary/page APIs plus Wikidata
- The page is one route: books first, movies second
- UI renders vertical cards, not raw API payloads or mixed tables

## Read Order

1. Read `docs/user-profile.md`
2. Read `references/recommendation-schemas.md`
3. Read `references/books-api.md` for books
4. Read `references/movies-api.md` for movies

## Required Workflow

1. Parse the recommendation titles from `docs/user-profile.md`
2. Keep books and movies on separate fetch paths
3. Apply local overrides for ambiguous titles when needed
4. Fetch upstream data
5. Resize or otherwise optimize fetched images to the UI's required dimensions before using them
6. Normalize into the schemas from `references/recommendation-schemas.md`
7. Render UI from normalized data only

Do not pass raw Open Library, Wikipedia, or Wikidata responses into page components.

## Matching Rules

Search results are not fully deterministic. Encode disambiguation as data or code.

Typical overrides:
- book `authorHint`
- movie `pageTitleHint`

Keep overrides local and explicit. Do not rely on manual runtime decisions.

## Page Contract

The page shape for this repo is fixed:
- one `/recommendations` page
- `Book Recommendations` section first
- `Movie Recommendations` section second
- vertical list in each section
- image-led cards with compact metadata

Each card should show only fetchable fields:
- image
- title
- creator line
- short description
- metadata rows
- source link

Do not use original-size upstream images directly in the UI. Resize them first to the card layout you render.

## Fetch Strategy

Choose one:
- build-time fetching if the site is static and should deploy predictably
- runtime fetching only if the app already expects public client-side requests

For static hosting such as GitHub Pages, prefer build-time normalization.

## What Lives In Each Reference

- `references/recommendation-schemas.md`
  - source input schema
  - override schema
  - normalized card schema
  - page schema
  - optional artifact schema
- `references/books-api.md`
  - Open Library endpoint order
  - required query params
  - response sections to extract
  - book field mapping
- `references/movies-api.md`
  - Wikipedia/Wikidata endpoint order
  - required query params
  - response sections to extract
  - movie field mapping

## Output Rule

Use the schemas for consistency.

The implementation should keep three layers separate:
- raw source payloads
- normalized data
- rendered UI
