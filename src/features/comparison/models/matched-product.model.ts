import type { Offer } from "../../search/models/offer.model.js";

/**
 * Represents a normalized product produced by the AI
 * Product Matching Engine.
 *
 * Multiple offers from different stores that refer to the
 * same real-world product are grouped into one MatchedProduct.
 */
export interface MatchedProduct {
  /**
   * Unique identifier for the matched product.
   */
  id: string;

  /**
   * Canonical product title selected by the AI.
   */
  title: string;

  /**
   * Representative product image.
   */
  image: string;

  /**
   * Confidence score produced by the AI matching engine.
   *
   * Range:
   * 0.0 - 1.0
   */
  confidence: number;

  /**
   * All offers determined to represent the same product.
   */
  offers: Offer[];
}
