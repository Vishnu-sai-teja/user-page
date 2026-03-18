export type RecommendationMetadataRow = {
  label: string;
  value: string;
};

export type RecommendationCardBase = {
  slug: string;
  title: string;
  creator: string | null;
  year: string | null;
  description: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
  metadata: RecommendationMetadataRow[];
};

export type BookRecommendationCard = RecommendationCardBase & {
  kind: "book";
};

export type MovieRecommendationCard = RecommendationCardBase & {
  kind: "movie";
};

export type RecommendationsPageData = {
  books: BookRecommendationCard[];
  movies: MovieRecommendationCard[];
};
