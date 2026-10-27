export interface AiProductAnalysisRequestDto {
  query?: string;
  limit?: number;
}

export interface AiProductAnalysisResponseDto {
  query: string;
  generated_at: string;
  summary: unknown;
  analyses: AiProductAnalysisItemDto[];
}

export interface AiSemanticGroupingResponseDto {
  generated_at: string;
  model: string;
  input_group_count: number;
  output_group_count: number;
  merge_count: number;
  groups: SearchResponseDto[];
}

import type { SearchResponseDto } from "../../marketplace/dto/SearchResponseDto.js";

export interface AiProductComparisonRequestDto {
  groups: Array<{
    comparisonKey: string;
    offers: Array<{
      id: string;
      productId: string;
      title: string;
      brand?: string;
      category?: string;
      price: number;
      originalPrice?: number;
      currency: string;
      imageUrl?: string;
      productUrl?: string;
      marketplace: string;
      inStock: boolean;
      rating?: number;
      reviewCount?: number;
      dataSource?: "live" | "persisted-snapshot";
      observedAt?: string;
      availabilityStatus?: "in-stock" | "out-of-stock" | "unverified";
    }>;
  }>;
}

export interface AiRankedComparisonProductDto {
  rank: number;
  verdict: string;
  scores: {
    overall: number;
    deal: number;
    quality: number;
    availability: number;
    market_confidence: number;
    stability: number;
  };
  analysis: AiProductAnalysisItemDto;
}

export interface AiProductComparisonResponseDto {
  generated_at: string;
  winner_id: string | null;
  winner_title: string | null;
  confidence: number;
  headline: string;
  winner_reason: string;
  price_range: number;
  evidence: {
    product_count: number;
    offer_count: number;
    marketplace_count: number;
    minimum_marketplaces_per_product: number;
    rated_offer_percentage: number;
  };
  rankings: AiRankedComparisonProductDto[];
}

export interface AiProductPredictionDto {
  direction: "up" | "down" | "stable";
  change_percentage: number;
  confidence: number;
  explanation: string;
  sample_size?: number;
  method?: string;
}

export interface AiProductRecommendationDto {
  action: string;
  priority: "high" | "medium" | "low";
  reason: string;
  model_score?: number | null;
  method?: string;
}

export interface AiVariantVerificationDto {
  status: "verified" | "review" | "conflict" | "insufficient";
  confidence: number;
  summary: string;
  matched_attributes: string[];
  conflicting_attributes: string[];
  incomplete_attributes: string[];
}

export interface AiProductAnalysisItemDto {
  id: string;
  title: string;
  relevance_score: number;
  relevance_reason: string;
  brand?: string | null;
  category?: string | null;
  marketplaces: string[];
  best_marketplace: string;
  currency: string;
  best_price: number;
  highest_price: number;
  average_price: number;
  savings_percentage: number;
  price_spread: number;
  price_volatility_score: number;
  confidence_score: number;
  evaluation_score: number;
  risk_level: "high" | "medium" | "low";
  variant_verification: AiVariantVerificationDto;
  insight: string;
  prediction: AiProductPredictionDto;
  recommendation: AiProductRecommendationDto;
}
