import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import type {
  RecommendationCard,
  RecommendationMetadataRow,
  RecommendationsPageData
} from "../src/content/siteContent";

type ProfileRecommendations = {
  books: string[];
  movies: string[];
};

type BookOverride = {
  authorHint?: string;
  isbnHint?: string;
};

type MovieOverride = {
  pageTitleHint?: string;
};

type SearchBookDoc = {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;
  isbn?: string[];
};

type BookSearchResponse = {
  docs?: SearchBookDoc[];
};

type OpenLibraryDescription = string | { value?: string };

type WorkDetailsResponse = {
  title?: string;
  description?: OpenLibraryDescription;
  covers?: number[];
  first_publish_date?: string;
};

type EditionEntry = {
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  isbn_10?: string[];
  isbn_13?: string[];
  covers?: number[];
};

type EditionsResponse = {
  entries?: EditionEntry[];
};

type WikipediaSearchItem = {
  title?: string;
  snippet?: string;
};

type WikipediaSearchResponse = {
  query?: {
    search?: WikipediaSearchItem[];
  };
};

type WikipediaSummaryResponse = {
  title?: string;
  description?: string;
  extract?: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
  thumbnail?: {
    source?: string;
  };
  originalimage?: {
    source?: string;
  };
};

type WikipediaPageDetails = {
  query?: {
    pages?: Record<
      string,
      {
        fullurl?: string;
        extract?: string;
        original?: {
          source?: string;
        };
        pageprops?: {
          wikibase_item?: string;
        };
      }
    >;
  };
};

type WikidataEntityResponse = {
  entities?: Record<string, WikidataEntity>;
};

type WikidataEntity = {
  labels?: Record<string, { value?: string }>;
  claims?: Record<string, WikidataClaim[]>;
};

type WikidataClaim = {
  mainsnak?: {
    datavalue?: {
      value?:
        | string
        | number
        | {
            amount?: string;
            id?: string;
            time?: string;
          };
    };
  };
};

const scriptRoot = process.cwd();
const workspaceRoot = path.resolve(scriptRoot, "..");
const userProfilePath = path.join(workspaceRoot, "docs", "user-profile.md");
const generatedDataPath = path.join(scriptRoot, "src", "content", "recommendations.generated.ts");
const recommendationImageDirectory = path.join(scriptRoot, "public", "recommendations");

const bookOverrides: Record<string, BookOverride> = {
  "Programming Massively Parallel Processors": { authorHint: "David B. Kirk" },
  "The Lord of the Rings": { authorHint: "J.R.R. Tolkien" },
  "Scion of Ikshvaku": { authorHint: "Amish Tripathi" },
  "The Man Who Knew Infinity": { authorHint: "Robert Kanigel" },
  "The Adventures of Sherlock Holmes": { authorHint: "Arthur Conan Doyle" }
};

const movieOverrides: Record<string, MovieOverride> = {
  "Avengers: Endgame": { pageTitleHint: "Avengers: Endgame" },
  "Iron Man": { pageTitleHint: "Iron Man (2008 film)" },
  "Black Panther: Wakanda Forever": { pageTitleHint: "Black Panther: Wakanda Forever" },
  "Dhurandhar": { pageTitleHint: "Dhurandhar" },
  "Baahubali": { pageTitleHint: "Baahubali: The Beginning" }
};

/**
 * Runs the full build-time recommendation generation flow: parse source titles,
 * fetch public metadata, resize artwork locally, and emit typed normalized data.
 */
async function main(): Promise<void> {
  const sourceRecommendations = await parseRecommendationsFromProfile(userProfilePath);

  await ensureCleanImageDirectory(recommendationImageDirectory);

  const books = await Promise.all(sourceRecommendations.books.map((title) => buildBookRecommendation(title)));
  const movies = await Promise.all(sourceRecommendations.movies.map((title) => buildMovieRecommendation(title)));

  const pageData: RecommendationsPageData = {
    books,
    movies
  };

  await writeGeneratedDataFile(generatedDataPath, pageData);

  console.log(`Generated ${books.length} book recommendations and ${movies.length} movie recommendations.`);
}

/**
 * Extracts the ordered book and movie recommendation titles from the user
 * profile so the public APIs remain downstream from the approved content source.
 */
async function parseRecommendationsFromProfile(filePath: string): Promise<ProfileRecommendations> {
  const markdown = await readFile(filePath, "utf8");

  return {
    books: extractOrderedSection(markdown, "## Book Recommendations"),
    movies: extractOrderedSection(markdown, "## Movie Recommendations")
  };
}

/**
 * Reads one ordered markdown section and preserves the listed order so the UI
 * mirrors the user's curated sequence rather than the API's ranking.
 */
function extractOrderedSection(markdown: string, heading: string): string[] {
  const headingIndex = markdown.indexOf(heading);

  if (headingIndex === -1) {
    return [];
  }

  const afterHeading = markdown.slice(headingIndex + heading.length);
  const nextHeadingIndex = afterHeading.search(/\n##\s+/);
  const sectionContent = nextHeadingIndex === -1 ? afterHeading : afterHeading.slice(0, nextHeadingIndex);

  return sectionContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => line.replace(/^\d+\.\s+/, "").trim());
}

/**
 * Removes previously generated artwork so each regeneration reflects the latest
 * upstream fetches and does not leave stale files behind.
 */
async function ensureCleanImageDirectory(directoryPath: string): Promise<void> {
  await mkdir(directoryPath, { recursive: true });

  const entries = await readdir(directoryPath);
  await Promise.all(entries.map((entry) => rm(path.join(directoryPath, entry), { force: true })));
}

/**
 * Builds one normalized book recommendation card from Open Library search,
 * work details, edition metadata, and an optimized local cover image.
 */
async function buildBookRecommendation(title: string): Promise<RecommendationCard> {
  try {
    const override = bookOverrides[title] ?? {};
    const searchResponse = await searchOpenLibraryBooks(title, override);
    const match = pickBestBookMatch(searchResponse.docs ?? [], title, override.authorHint);

    if (!match?.key) {
      return createFallbackRecommendation("book", title);
    }

    const workPath = match.key.startsWith("/") ? match.key : `/${match.key}`;
    const workDetails = await requestJson<WorkDetailsResponse>(`https://openlibrary.org${workPath}.json`);
    const editions = await requestJson<EditionsResponse>(`https://openlibrary.org${workPath}/editions.json?limit=10`);
    const bestEdition = pickBestEdition(editions.entries ?? []);
    const coverSource = selectBookCoverSource(match, workDetails, bestEdition, override.isbnHint);
    const imageUrl = await optimizeRemoteImage(coverSource, `book-${slugify(title)}`);

    return {
      kind: "book",
      slug: slugify(title),
      title: sanitizeText(workDetails.title) ?? title,
      creator: sanitizeText(match.author_name?.[0]) ?? null,
      year: stringifyValue(match.first_publish_year ?? workDetails.first_publish_date),
      description: truncateDescription(extractOpenLibraryDescription(workDetails.description)),
      imageUrl,
      sourceUrl: `https://openlibrary.org${workPath}`,
      metadata: compactMetadata([
        ["Author", sanitizeText(match.author_name?.[0])],
        ["First published", stringifyValue(match.first_publish_year ?? workDetails.first_publish_date)],
        ["Edition count", stringifyValue(match.edition_count)],
        ["Pages", stringifyValue(bestEdition?.number_of_pages)],
        ["Publisher", sanitizeText(bestEdition?.publishers?.[0])]
      ])
    };
  } catch (error) {
    console.warn(`Book recommendation generation fell back for \"${title}\".`, error);
    return createFallbackRecommendation("book", title);
  }
}

/**
 * Tries the documented Open Library search first with the explicit override and
 * then without it so intermittent search failures do not block the full page.
 */
async function searchOpenLibraryBooks(title: string, override: BookOverride): Promise<BookSearchResponse> {
  const baseParams = {
    title,
    limit: "10",
    fields: "key,title,author_name,first_publish_year,edition_count,cover_i,isbn"
  };

  try {
    return await requestJson<BookSearchResponse>(
      `https://openlibrary.org/search.json?${new URLSearchParams({
        ...baseParams,
        ...(override.authorHint ? { author: override.authorHint } : {})
      }).toString()}`
    );
  } catch {
    return requestJson<BookSearchResponse>(
      `https://openlibrary.org/search.json?${new URLSearchParams(baseParams).toString()}`
    );
  }
}

/**
 * Chooses the most plausible Open Library search result by preferring an exact
 * title match and, when supplied, the expected author.
 */
function pickBestBookMatch(docs: SearchBookDoc[], title: string, authorHint?: string): SearchBookDoc | undefined {
  const normalizedTitle = title.toLowerCase();
  const normalizedAuthor = authorHint?.toLowerCase();

  return (
    docs.find((doc) => {
      const titleMatches = doc.title?.toLowerCase() === normalizedTitle;
      const authorMatches = normalizedAuthor
        ? doc.author_name?.some((author) => author.toLowerCase() === normalizedAuthor)
        : true;

      return titleMatches && authorMatches;
    }) ?? docs[0]
  );
}

/**
 * Selects the richest available edition metadata so the card can surface page
 * count and publisher without dumping edition data directly into the UI.
 */
function pickBestEdition(editions: EditionEntry[]): EditionEntry | undefined {
  return editions.find((entry) => entry.number_of_pages || entry.publishers?.length || entry.covers?.length) ?? editions[0];
}

/**
 * Resolves the best available book cover source using the documented priority
 * of direct cover id, work cover, edition cover, and finally ISBN hints.
 */
function selectBookCoverSource(
  match: SearchBookDoc,
  workDetails: WorkDetailsResponse,
  edition: EditionEntry | undefined,
  isbnHint?: string
): string | null {
  const coverId = match.cover_i ?? workDetails.covers?.[0] ?? edition?.covers?.[0];

  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }

  const isbn = isbnHint ?? match.isbn?.[0] ?? edition?.isbn_13?.[0] ?? edition?.isbn_10?.[0];
  return isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null;
}

/**
 * Builds one normalized movie recommendation card from Wikipedia and Wikidata,
 * then stores an optimized local poster when source artwork is available.
 */
async function buildMovieRecommendation(title: string): Promise<RecommendationCard> {
  try {
    const override = movieOverrides[title] ?? {};
    const pageTitle = override.pageTitleHint ?? (await resolveWikipediaPageTitle(title));

    if (!pageTitle) {
      return createFallbackRecommendation("movie", title);
    }

    const encodedPageTitle = encodeURIComponent(pageTitle);
    const summary = await requestJson<WikipediaSummaryResponse>(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedPageTitle}`
    );
    const pageDetails = await requestJson<WikipediaPageDetails>(
      `https://en.wikipedia.org/w/api.php?${new URLSearchParams({
        action: "query",
        prop: "extracts|info|pageimages|pageprops|categories",
        titles: pageTitle,
        explaintext: "1",
        inprop: "url",
        piprop: "original",
        ppprop: "wikibase_item",
        cllimit: "max",
        format: "json",
        origin: "*"
      }).toString()}`
    );
    const pageRecord = Object.values(pageDetails.query?.pages ?? {})[0];
    const wikidataId = pageRecord?.pageprops?.wikibase_item;
    const wikidataEntity = wikidataId
      ? (await requestJson<WikidataEntityResponse>(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`)).entities?.[wikidataId]
      : undefined;
    const entityLabels = wikidataEntity ? await fetchLinkedWikidataLabels(wikidataEntity) : {};
    const imageUrl = await optimizeRemoteImage(selectMoviePoster(summary, pageRecord), `movie-${slugify(title)}`);

    return {
      kind: "movie",
      slug: slugify(title),
      title,
      creator: resolveEntityLabel(firstEntityId(wikidataEntity?.claims?.P57), entityLabels),
      year: normalizeWikidataDate(firstDate(wikidataEntity?.claims?.P577)),
      description: truncateDescription(sanitizeText(summary.extract) ?? sanitizeText(summary.description)),
      imageUrl,
      sourceUrl: toSafeUrl(summary.content_urls?.desktop?.page) ?? toSafeUrl(pageRecord?.fullurl) ?? null,
      metadata: compactMetadata([
        ["Director", resolveEntityLabel(firstEntityId(wikidataEntity?.claims?.P57), entityLabels)],
        ["Release", normalizeWikidataDate(firstDate(wikidataEntity?.claims?.P577))],
        ["Runtime", normalizeRuntime(firstAmount(wikidataEntity?.claims?.P2047))],
        ["Genre", joinEntityLabels(entityIds(wikidataEntity?.claims?.P136), entityLabels)],
        ["Language", joinEntityLabels(entityIds(wikidataEntity?.claims?.P364), entityLabels)],
        ["Country", joinEntityLabels(entityIds(wikidataEntity?.claims?.P495), entityLabels)]
      ])
    };
  } catch (error) {
    console.warn(`Movie recommendation generation fell back for \"${title}\".`, error);
    return createFallbackRecommendation("movie", title);
  }
}

/**
 * Resolves the most likely Wikipedia page title for a movie by preferring an
 * exact title match and snippets that explicitly identify the result as a film.
 */
async function resolveWikipediaPageTitle(title: string): Promise<string | null> {
  const searchResponse = await requestJson<WikipediaSearchResponse>(
    `https://en.wikipedia.org/w/api.php?${new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: `intitle:\"${title}\"`,
      srlimit: "10",
      format: "json",
      origin: "*"
    }).toString()}`
  );

  const candidates = searchResponse.query?.search ?? [];
  const normalizedTitle = title.toLowerCase();

  const exactFilmMatch = candidates.find((candidate) => {
    const candidateTitle = candidate.title?.toLowerCase();
    const candidateSnippet = candidate.snippet?.toLowerCase() ?? "";
    return candidateTitle === normalizedTitle && candidateSnippet.includes("film");
  });

  const exactMatch = candidates.find((candidate) => candidate.title?.toLowerCase() === normalizedTitle);
  const filmMatch = candidates.find((candidate) => (candidate.snippet?.toLowerCase() ?? "").includes("film"));

  return exactFilmMatch?.title ?? exactMatch?.title ?? filmMatch?.title ?? candidates[0]?.title ?? null;
}

/**
 * Chooses the documented poster priority so the local optimized image starts
 * from the best available Wikipedia source artwork.
 */
function selectMoviePoster(
  summary: WikipediaSummaryResponse,
  pageRecord: { original?: { source?: string } } | undefined
): string | null {
  return summary.originalimage?.source ?? pageRecord?.original?.source ?? summary.thumbnail?.source ?? null;
}

/**
 * Fetches labels for linked Wikidata entities so the card can show human-
 * readable director, genre, language, and country values.
 */
async function fetchLinkedWikidataLabels(entity: WikidataEntity): Promise<Record<string, string>> {
  const ids = new Set<string>([
    ...entityIds(entity.claims?.P57),
    ...entityIds(entity.claims?.P136),
    ...entityIds(entity.claims?.P364),
    ...entityIds(entity.claims?.P495)
  ]);

  if (ids.size === 0) {
    return {};
  }

  const response = await requestJson<WikidataEntityResponse>(
    `https://www.wikidata.org/w/api.php?${new URLSearchParams({
      action: "wbgetentities",
      ids: Array.from(ids).join("|"),
      format: "json",
      languages: "en",
      props: "labels",
      origin: "*"
    }).toString()}`
  );

  return Object.fromEntries(
    Object.entries(response.entities ?? {}).map(([id, linkedEntity]) => [id, linkedEntity.labels?.en?.value ?? id])
  );
}

/**
 * Downloads a remote image, resizes it for the card layout, and stores it in
 * the app's public directory so the deployed site does not depend on full-size
 * upstream artwork at runtime.
 */
async function optimizeRemoteImage(sourceUrl: string | null, fileStem: string): Promise<string | null> {
  if (!sourceUrl) {
    return null;
  }

  try {
    const response = await fetch(sourceUrl, {
      headers: {
        "User-Agent": "about-me-carbon/1.0"
      }
    });

    if (!response.ok) {
      return null;
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const outputPath = path.join(recommendationImageDirectory, `${fileStem}.webp`);

    await sharp(imageBuffer)
      .resize({ width: 480, height: 640, fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(outputPath);

    return `/recommendations/${fileStem}.webp`;
  } catch {
    return null;
  }
}

/**
 * Performs a JSON fetch with a consistent user agent so upstream services and
 * local failures are easier to reason about during generation.
 */
async function requestJson<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "about-me-carbon/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with status ${response.status}`);
  }

  return (await response.json()) as TResponse;
}

/**
 * Writes the generated recommendations module as typed source so the runtime UI
 * consumes normalized data only and does not know about raw upstream payloads.
 */
async function writeGeneratedDataFile(filePath: string, pageData: RecommendationsPageData): Promise<void> {
  const fileContents = `import type { RecommendationsPageData } from "./siteContent";\n\nexport const recommendationsPageData: RecommendationsPageData = ${JSON.stringify(pageData, null, 2)};\n`;
  await writeFile(filePath, fileContents, "utf8");
}

/**
 * Produces a stable fallback card when a title cannot be resolved upstream so
 * the route still preserves the curated order from the user profile.
 */
function createFallbackRecommendation(kind: "book" | "movie", title: string): RecommendationCard {
  return {
    kind,
    slug: slugify(title),
    title,
    creator: null,
    year: null,
    description: null,
    imageUrl: null,
    sourceUrl: null,
    metadata: []
  };
}

/**
 * Converts a recommendation title into a predictable slug suitable for image
 * filenames and stable rendering keys.
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extracts Open Library's mixed description field into a single normalized text
 * value and removes empty or whitespace-only outputs.
 */
function extractOpenLibraryDescription(description: OpenLibraryDescription | undefined): string | null {
  if (typeof description === "string") {
    return sanitizeText(description);
  }

  return sanitizeText(description?.value);
}

/**
 * Reduces long upstream summaries to a compact card-friendly description while
 * still preserving enough substance to reward deeper reading.
 */
function truncateDescription(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const sentenceMatch = value.match(/^(.*?[.!?])(\s+.*?[.!?])?/);
  const sentenceSummary = sentenceMatch?.[0]?.trim();

  if (sentenceSummary && sentenceSummary.length <= 420) {
    return sentenceSummary;
  }

  if (value.length <= 420) {
    return value;
  }

  return `${value.slice(0, 417).trimEnd()}...`;
}

/**
 * Accepts a URL string only when it uses the https or http protocol, returning
 * null for any other scheme to prevent javascript: or data: URLs from reaching
 * the generated recommendation cards.
 */
function toSafeUrl(value: string | undefined | null): string | null {
  if (!value) {
    return null;
  }

  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Normalizes plain text fields by trimming whitespace and converting blank
 * values into null, which keeps the generated UI schema consistent.
 */
function sanitizeText(value: string | undefined | null): string | null {
  const normalizedValue = value?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return normalizedValue ? normalizedValue : null;
}

/**
 * Converts primitive metadata values into display strings while preserving null
 * for empty fields so placeholder rows never reach the UI.
 */
function stringifyValue(value: string | number | undefined | null): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  const normalizedValue = String(value).trim();
  return normalizedValue ? normalizedValue : null;
}

/**
 * Collapses optional metadata pairs into the exact row structure used by the UI,
 * omitting any empty values before the file is generated.
 */
function compactMetadata(entries: ReadonlyArray<readonly [string, string | null]>): RecommendationMetadataRow[] {
  return entries
    .filter(([, value]) => value)
    .map(([label, value]) => ({
      label,
      value: value as string
    }));
}

/**
 * Returns the first linked entity id from a Wikidata claim list, which is
 * sufficient for single-value fields such as director.
 */
function firstEntityId(claims: WikidataClaim[] | undefined): string | null {
  return entityIds(claims)[0] ?? null;
}

/**
 * Collects linked entity ids from Wikidata claims so label lookups can remain a
 * separate, explicit normalization step.
 */
function entityIds(claims: WikidataClaim[] | undefined): string[] {
  return (claims ?? [])
    .map((claim) => claim.mainsnak?.datavalue?.value)
    .flatMap((value) => (typeof value === "object" && value?.id ? [value.id] : []));
}

/**
 * Reads the first time-valued claim from Wikidata for date-like fields such as
 * release date.
 */
function firstDate(claims: WikidataClaim[] | undefined): string | null {
  const value = (claims ?? []).map((claim) => claim.mainsnak?.datavalue?.value).find((entry) => typeof entry === "object" && Boolean(entry?.time));
  return typeof value === "object" && value?.time ? value.time : null;
}

/**
 * Reads the first numeric amount-style claim from Wikidata for duration fields.
 */
function firstAmount(claims: WikidataClaim[] | undefined): string | null {
  const value = (claims ?? []).map((claim) => claim.mainsnak?.datavalue?.value).find((entry) => typeof entry === "object" && Boolean(entry?.amount));
  return typeof value === "object" && value?.amount ? value.amount : null;
}

/**
 * Resolves a linked entity id into its English label when one was fetched.
 */
function resolveEntityLabel(entityId: string | null, labels: Record<string, string>): string | null {
  return entityId ? sanitizeText(labels[entityId] ?? entityId) : null;
}

/**
 * Joins multiple linked entity labels into a compact comma-separated metadata
 * value while preserving null when no labels exist.
 */
function joinEntityLabels(ids: string[], labels: Record<string, string>): string | null {
  const values = ids.map((id) => labels[id]).filter((value): value is string => Boolean(value)).slice(0, 3);
  return values.length > 0 ? values.join(", ") : null;
}

/**
 * Normalizes Wikidata's signed timestamp format down to a simple release year.
 */
function normalizeWikidataDate(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const match = value.match(/([0-9]{4})/);
  return match ? match[1] : null;
}

/**
 * Converts Wikidata duration amounts into a readable runtime in minutes when
 * the claim can be interpreted numerically.
 */
function normalizeRuntime(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const numericValue = Number.parseFloat(value.replace("+", ""));

  if (Number.isNaN(numericValue)) {
    return null;
  }

  const minutes = numericValue > 300 ? Math.round(numericValue / 60) : Math.round(numericValue);
  return `${minutes} min`;
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});