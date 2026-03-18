/**
 * generate-recommendations.ts
 *
 * Pre-fetches book and movie metadata from public APIs and saves the normalized
 * data to src/data/recommendations.json for static use in the app.
 *
 * Books: Open Library
 * Movies: Wikipedia + Wikidata
 *
 * Run with:  npm run generate:recommendations
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type {
  BookRecommendationCard,
  MovieRecommendationCard,
  RecommendationsPageData,
  RecommendationMetadataRow,
} from "../types/recommendations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Source Titles ────────────────────────────────────────────────────────────

const BOOK_TITLES = [
  "Sapiens: A Brief History of Humankind",
  "The Lord of the Rings",
  "The Alchemist",
  "The Man Who Knew Infinity",
  "The Adventures of Sherlock Holmes",
];

const MOVIE_TITLES = [
  "Avengers: Endgame",
  "Avengers: Infinity War",
  "Black Panther: Wakanda Forever",
  "Inception",
  "Game of Thrones",
];

// ─── Overrides for ambiguous titles ───────────────────────────────────────────

const BOOK_OVERRIDES: Record<string, { authorHint?: string; isbnHint?: string }> = {
  "The Adventures of Sherlock Holmes": { authorHint: "Arthur Conan Doyle" },
  "The Man Who Knew Infinity": { authorHint: "Robert Kanigel" },
  "Sapiens: A Brief History of Humankind": { authorHint: "Yuval Noah Harari", isbnHint: "9780062316097" },
  "The Alchemist": { authorHint: "Paulo Coelho", isbnHint: "9780062315007" },
  "The Lord of the Rings": { authorHint: "J.R.R. Tolkien" },
};

const MOVIE_OVERRIDES: Record<string, { pageTitleHint?: string }> = {
  "Avengers: Endgame": { pageTitleHint: "Avengers: Endgame" },
  "Avengers: Infinity War": { pageTitleHint: "Avengers: Infinity War" },
  "Black Panther: Wakanda Forever": { pageTitleHint: "Black Panther: Wakanda Forever (film)" },
  "Inception": { pageTitleHint: "Inception (film)" },
  "Game of Thrones": { pageTitleHint: "Game of Thrones" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function truncate(text: string | undefined | null, max: number): string | null {
  if (!text) return null;
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ─── Books ────────────────────────────────────────────────────────────────────

async function fetchBook(title: string): Promise<BookRecommendationCard> {
  const override = BOOK_OVERRIDES[title] ?? {};
  const slug = slugify(title);

  // 1. Search
  const searchParams = new URLSearchParams({
    title,
    limit: "10",
    fields: "key,title,author_name,first_publish_year,edition_count,cover_i,isbn",
  });
  if (override.authorHint) searchParams.set("author", override.authorHint);
  if (override.isbnHint) searchParams.set("isbn", override.isbnHint);

  type OLSearchResult = {
    docs: Array<{
      key: string;
      title: string;
      author_name?: string[];
      first_publish_year?: number;
      edition_count?: number;
      cover_i?: number;
      isbn?: string[];
    }>;
  };

  const searchData = await fetchJson<OLSearchResult>(
    `https://openlibrary.org/search.json?${searchParams.toString()}`
  );
  const doc = searchData?.docs?.[0];

  if (!doc) {
    return {
      kind: "book",
      slug,
      title,
      creator: override.authorHint ?? null,
      year: null,
      description: null,
      imageUrl: null,
      sourceUrl: null,
      metadata: [],
    };
  }

  const workKey = doc.key; // e.g. "/works/OL27448W"
  const coverId = doc.cover_i;
  const isbn = override.isbnHint ?? doc.isbn?.[0] ?? null;
  const authorName = doc.author_name?.[0] ?? override.authorHint ?? null;
  const firstPublishYear = doc.first_publish_year ?? null;
  const editionCount = doc.edition_count ?? null;

  // 2. Work details
  type OLWork = {
    description?: string | { value?: string };
    covers?: number[];
  };
  const workData = await fetchJson<OLWork>(
    `https://openlibrary.org${workKey}.json`
  );

  let description: string | null = null;
  if (workData?.description) {
    const raw = workData.description;
    description =
      typeof raw === "string" ? raw : (raw.value ?? null);
    description = truncate(description, 280);
  }

  // 3. Determine cover URL
  let imageUrl: string | null = null;
  const resolvedCoverId = coverId ?? workData?.covers?.[0];
  if (resolvedCoverId) {
    imageUrl = `https://covers.openlibrary.org/b/id/${resolvedCoverId}-L.jpg`;
  } else if (isbn) {
    imageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  }

  const metadata: RecommendationMetadataRow[] = [];
  if (authorName) metadata.push({ label: "Author", value: authorName });
  if (firstPublishYear) metadata.push({ label: "First published", value: String(firstPublishYear) });
  if (editionCount) metadata.push({ label: "Editions", value: String(editionCount) });

  return {
    kind: "book",
    slug,
    title: doc.title ?? title,
    creator: authorName,
    year: firstPublishYear ? String(firstPublishYear) : null,
    description,
    imageUrl,
    sourceUrl: `https://openlibrary.org${workKey}`,
    metadata,
  };
}

// ─── Movies ───────────────────────────────────────────────────────────────────

async function fetchMovie(title: string): Promise<MovieRecommendationCard> {
  const override = MOVIE_OVERRIDES[title] ?? {};
  const slug = slugify(title);
  const queryTitle = override.pageTitleHint ?? title;

  // 1. Wikipedia Search
  type WikiSearchResult = {
    query?: {
      search?: Array<{ title: string; pageid: number; snippet: string }>;
    };
  };
  const searchParams = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: `intitle:"${queryTitle}"`,
    srlimit: "10",
    format: "json",
    origin: "*",
  });

  const searchData = await fetchJson<WikiSearchResult>(
    `https://en.wikipedia.org/w/api.php?${searchParams.toString()}`
  );

  const results = searchData?.query?.search ?? [];
  const bestResult = results.find((r) =>
    r.snippet.toLowerCase().includes("film") ||
    r.snippet.toLowerCase().includes("series") ||
    r.title.toLowerCase() === queryTitle.toLowerCase()
  ) ?? results[0];

  if (!bestResult) {
    return {
      kind: "movie",
      slug,
      title,
      creator: null,
      year: null,
      description: null,
      imageUrl: null,
      sourceUrl: null,
      metadata: [],
    };
  }

  const pageTitle = encodeURIComponent(bestResult.title.replace(/ /g, "_"));

  // 2. Wikipedia Summary
  type WikiSummary = {
    title?: string;
    description?: string;
    extract?: string;
    content_urls?: { desktop?: { page?: string } };
    thumbnail?: { source?: string };
    originalimage?: { source?: string };
  };

  const summaryData = await fetchJson<WikiSummary>(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`
  );

  const extract = truncate(summaryData?.extract, 280);
  const description = extract ?? truncate(summaryData?.description, 280);
  const sourceUrl = summaryData?.content_urls?.desktop?.page ?? null;
  let imageUrl: string | null =
    summaryData?.originalimage?.source ?? summaryData?.thumbnail?.source ?? null;

  // 3. Wikipedia Page Details for Wikidata ID
  type WikiPageDetailsResult = {
    query?: {
      pages?: Record<
        string,
        {
          fullurl?: string;
          pageprops?: { wikibase_item?: string };
          original?: { source?: string };
        }
      >;
    };
  };

  const detailsParams = new URLSearchParams({
    action: "query",
    prop: "info|pageimages|pageprops",
    titles: bestResult.title,
    inprop: "url",
    piprop: "original",
    ppprop: "wikibase_item",
    format: "json",
    origin: "*",
  });

  const pageDetails = await fetchJson<WikiPageDetailsResult>(
    `https://en.wikipedia.org/w/api.php?${detailsParams.toString()}`
  );

  const pages = pageDetails?.query?.pages ?? {};
  const pageData = Object.values(pages)[0];

  if (!imageUrl && pageData?.original?.source) {
    imageUrl = pageData.original.source;
  }

  const wikidataId = pageData?.pageprops?.wikibase_item;
  const metadata: RecommendationMetadataRow[] = [];

  // 4. Wikidata for structured metadata
  if (wikidataId) {
    type WikidataEntity = {
      entities?: Record<
        string,
        {
          claims?: Record<
            string,
            Array<{
              mainsnak?: {
                datavalue?: {
                  value?:
                    | string
                    | { time?: string; id?: string; amount?: string }
                    | { "entity-type"?: string; id?: string };
                };
              };
            }>
          >;
        }
      >;
    };

    const wdData = await fetchJson<WikidataEntity>(
      `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`
    );

    const entity = wdData?.entities?.[wikidataId];
    const claims = entity?.claims ?? {};

    const getStringValue = (pid: string): string | null => {
      const claim = claims[pid]?.[0]?.mainsnak?.datavalue?.value;
      if (typeof claim === "string") return claim;
      return null;
    };

    const getTimeValue = (pid: string): string | null => {
      const claim = claims[pid]?.[0]?.mainsnak?.datavalue?.value;
      if (claim && typeof claim === "object" && "time" in claim && claim.time) {
        return claim.time.slice(1, 5); // extract year from "+2019-..."
      }
      return null;
    };

    const releaseYear = getTimeValue("P577");
    const directorId = (() => {
      const v = claims["P57"]?.[0]?.mainsnak?.datavalue?.value;
      if (v && typeof v === "object" && "id" in v) return (v as { id: string }).id;
      return null;
    })();
    const runtime = (() => {
      const v = claims["P2047"]?.[0]?.mainsnak?.datavalue?.value;
      if (v && typeof v === "object" && "amount" in v && (v as { amount: string }).amount) {
        return Math.round(parseFloat((v as { amount: string }).amount)) + " min";
      }
      return null;
    })();

    if (releaseYear) metadata.push({ label: "Release", value: releaseYear });
    if (runtime) metadata.push({ label: "Runtime", value: runtime });

    // Fetch director name from Wikidata
    if (directorId) {
      type WDDirector = { labels?: { en?: { value?: string } } };
      const dirData = await fetchJson<WDDirector>(
        `https://www.wikidata.org/wiki/Special:EntityData/${directorId}.json`
      );
      const dirName =
        (dirData as { entities?: Record<string, WDDirector> })?.entities?.[directorId]
          ?.labels?.en?.value ?? null;
      if (dirName) {
        metadata.unshift({ label: "Director", value: dirName });
        return {
          kind: "movie",
          slug,
          title: summaryData?.title ?? title,
          creator: dirName,
          year: releaseYear,
          description,
          imageUrl,
          sourceUrl: sourceUrl ?? pageData?.fullurl ?? null,
          metadata,
        };
      }
    }

    return {
      kind: "movie",
      slug,
      title: summaryData?.title ?? title,
      creator: null,
      year: releaseYear,
      description,
      imageUrl,
      sourceUrl: sourceUrl ?? pageData?.fullurl ?? null,
      metadata,
    };
  }

  return {
    kind: "movie",
    slug,
    title: summaryData?.title ?? title,
    creator: null,
    year: null,
    description,
    imageUrl,
    sourceUrl: sourceUrl ?? null,
    metadata,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching book recommendations...");
  const books: BookRecommendationCard[] = [];
  for (const title of BOOK_TITLES) {
    console.log(`  → ${title}`);
    books.push(await fetchBook(title));
  }

  console.log("Fetching movie/show recommendations...");
  const movies: MovieRecommendationCard[] = [];
  for (const title of MOVIE_TITLES) {
    console.log(`  → ${title}`);
    movies.push(await fetchMovie(title));
  }

  const data: RecommendationsPageData = { books, movies };

  const outDir = join(__dirname, "../data");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "recommendations.json");
  writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`\nSaved to ${outPath}`);
  console.log(`  Books: ${books.length}`);
  console.log(`  Movies: ${movies.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
