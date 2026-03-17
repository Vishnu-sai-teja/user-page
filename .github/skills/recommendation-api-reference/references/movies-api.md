# Movies API

Use this reference for titles from `Movie Recommendations` in `docs/user-profile.md`.

Sources:
- Wikipedia
- Wikidata

No API key is required.

## Input

Start with:

```ts
type MovieRecommendationInput = {
  title: string;
  pageTitleHint?: string;
};
```

Use `pageTitleHint` for ambiguous titles such as franchise names or non-film pages.

## Fetch Order

1. Search Wikipedia by title
2. Fetch the page summary
3. Fetch page details to get `wikibase_item`
4. Fetch Wikidata entity details
5. Use the best available poster URL

## 1. Wikipedia Search

Endpoint:

```text
GET https://en.wikipedia.org/w/api.php
```

Required query params:
- `action=query`
- `list=search`
- `srsearch=<query>`
- `format=json`

Useful params:
- `srlimit=10`
- `origin=*`

Recommended query:

```text
srsearch=intitle:"<movie title>"
```

Extract from `query.search[n]`:
- `title`
- `pageid`
- `snippet`

Prefer:
- exact title matches
- results whose snippet mentions `film`
- explicit `pageTitleHint` when present

## 2. Wikipedia Summary

Endpoint:

```text
GET https://en.wikipedia.org/api/rest_v1/page/summary/<encoded_page_title>
```

Extract:
- `title`
- `description`
- `extract`
- `content_urls.desktop.page`
- `thumbnail.source`
- `originalimage.source`

Use:
- `extract` as the default card description
- `originalimage.source` as the best poster candidate
- the page URL as `sourceUrl`

## 3. Wikipedia Page Details

Endpoint:

```text
GET https://en.wikipedia.org/w/api.php
```

Recommended query params:
- `action=query`
- `prop=extracts|info|pageimages|pageprops|categories`
- `titles=<page_title>`
- `explaintext=1`
- `inprop=url`
- `piprop=original`
- `ppprop=wikibase_item`
- `cllimit=max`
- `format=json`
- `origin=*`

Extract from `query.pages[*]`:
- `fullurl`
- `extract`
- `original.source`
- `pageprops.wikibase_item`

Use this call mainly to get the Wikidata id and as a fallback for image or extract data.

## 4. Wikidata Entity

Endpoint:

```text
GET https://www.wikidata.org/wiki/Special:EntityData/<wikidata_id>.json
```

Useful properties:
- `P577` release date
- `P57` director
- `P136` genre
- `P2047` duration
- `P364` language
- `P495` country

Extract:
- release date
- director
- genre
- runtime
- language
- country

Keep the card compact. Do not dump full cast or all claims into the UI.

## Poster Source

Prefer in this order:
1. `summary.originalimage.source`
2. `page.original.source`
3. `summary.thumbnail.source`

If no image exists, render a placeholder.

## Normalize To

Map the result into the schemas from `recommendation-schemas.md`, not directly into UI components.

Primary movie card fields:
- `title`
- `creator`
- `year`
- `description`
- `imageUrl`
- `sourceUrl`
- `metadata`

Useful metadata rows:
- `Director`
- `Release`
- `Runtime`
- `Genre`
- `Language`
- `Country`

Suggested mapping:
- `creator` <- director from Wikidata
- `year` <- release year from `P577`
- `description` <- summary `extract`, then summary `description`
- `imageUrl` <- best poster source; resize the chosen image before use in the UI
- `sourceUrl` <- summary page URL or page `fullurl`

## Minimal Good Path

For most movies:
1. Wikipedia search
2. summary
3. page details
4. Wikidata entity
