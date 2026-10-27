export interface TrainingDatasetQueryDto {
  limit?: number;
  cursor?: string;
  query?: string;
}

export interface TrainingDatasetRecordDto {
  id: string;
  searchId: string;
  query: string;
  normalizedQuery: string;
  comparisonKey: string;
  observedAt: string;
  groupPosition: number;
  relevanceScore: number | null;
  confidenceScore: number | null;
  evaluationScore: number | null;
  isBestOffer: boolean;
  marketplace: string;
  externalOfferId: string;
  externalProductId: string | null;
  title: string;
  normalizedTitle: string;
  brand: string | null;
  category: string | null;
  modelNumber: string | null;
  gtin: string | null;
  price: number;
  originalPrice: number | null;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  inStock: boolean;
  productUrl: string | null;
  imageUrl: string | null;
  firstObservedAt: string;
  lastObservedAt: string;
  observationCount: number;
  enrichmentSource: string | null;
  specifications: unknown;
}

export interface TrainingDatasetResponseDto {
  version: "search-observations-v1";
  generatedAt: string;
  data: TrainingDatasetRecordDto[];
  pagination: {
    limit: number;
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export interface DatasetAnalyticsDto {
  generatedAt: string;
  searches: number;
  observations: number;
  uniqueListings: number;
  priceSnapshots: number;
  deduplicatedObservations: number;
  topQueries: Array<{
    query: string;
    count: number;
  }>;
  marketplaces: Array<{
    marketplace: string;
    listingCount: number;
  }>;
}
