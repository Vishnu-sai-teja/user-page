# Recommendation Schemas

Use this file for the internal contracts between:
- `docs/user-profile.md`
- the fetch layer
- normalization code
- the `/recommendations` UI

Use it with:
- `books-api.md`
- `movies-api.md`

## 1. Source Titles

```ts
type UserProfileRecommendations = {
  books: string[];
  movies: string[];
};
```

Rules:
- parse titles from `docs/user-profile.md`
- preserve order from the profile
- do not add display metadata here

## 2. Fetch Inputs And Overrides

```ts
type BookRecommendationInput = {
  title: string;
  authorHint?: string;
  isbnHint?: string;
};

type MovieRecommendationInput = {
  title: string;
  pageTitleHint?: string;
};

type RecommendationFetchOverrides = {
  books?: Record<string, Omit<BookRecommendationInput, "title">>;
  movies?: Record<string, Omit<MovieRecommendationInput, "title">>;
};
```

Use overrides to make ambiguous matches deterministic.

Example:

```ts
const recommendationFetchOverrides: RecommendationFetchOverrides = {
  books: {
    "The Adventures of Sherlock Holmes": { authorHint: "Arthur Conan Doyle" },
  },
  movies: {
    "Iron Man": { pageTitleHint: "Iron Man (2008 film)" },
    "Baahubali": { pageTitleHint: "Baahubali: The Beginning" },
  },
};
```

## 3. Normalized UI Schema

```ts
type RecommendationMetadataRow = {
  label: string;
  value: string;
};

type RecommendationCardBase = {
  slug: string;
  title: string;
  creator: string | null;
  year: string | null;
  description: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
  metadata: RecommendationMetadataRow[];
};

type BookRecommendationCard = RecommendationCardBase & {
  kind: "book";
};

type MovieRecommendationCard = RecommendationCardBase & {
  kind: "movie";
};

type RecommendationsPageData = {
  books: BookRecommendationCard[];
  movies: MovieRecommendationCard[];
};
```

Rules:
- render books above movies
- keep books and movies in separate arrays
- do not bind page components to raw API payloads

## 4. Recommended Metadata Rows

Books:
- `Author`
- `First published`
- `Edition count`
- `Pages`
- `Publisher`

Movies:
- `Director`
- `Release`
- `Runtime`
- `Genre`
- `Language`
- `Country`

Only include rows with real values.

## 5. Optional Fetch Artifact

Use a separate artifact shape if the app stores fetch audit data or generated JSON.

```ts
type RecommendationFetchArtifact = {
  inputTitle: string;
  resolvedTitle: string | null;
  source: "openlibrary" | "wikipedia-wikidata";
  matchedIdentifier: string | null;
  fetchedAt: string;
  raw: Record<string, unknown>;
  normalized: BookRecommendationCard | MovieRecommendationCard | null;
};
```

This is for debugging or static generation. It is not the UI schema.

## 6. Validation Rules

Before rendering:
- `slug` must be stable and URL-safe
- `title` must be non-empty
- `kind` must be `book` or `movie`
- `metadata` must be an array
- `books` and `movies` must exist even when empty

Recommended cleanup:
- trim strings
- drop empty metadata rows
- prefer `null` over empty strings
- keep raw payloads out of page components
