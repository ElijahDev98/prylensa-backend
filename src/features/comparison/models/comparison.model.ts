import type { Offer } from "../../search/models/offer.model.js";

/**
 * Represents a normalized product comparison.
 *
 * A Comparison groups together multiple offers that
 * refer to the same product across different stores.
 *
 * Example:
 *
 * Samsung Galaxy A56
 *
 * ├── Jumia
 * ├── Konga
 * └── Slot
 */
export interface Comparison {
  /**
   * Unique comparison identifier.
   */
  id: string;

  /**
   * Canonical product title.
   */
  title: string;

  /**
   * Representative product image.
   */
  image: string;

  /**
   * All matched offers.
   */
  offers: Offer[];

  /**
   * Lowest available price.
   */
  lowestPrice: number;

  /**
   * Highest available price.
   */
  highestPrice: number;

  /**
   * Average market price.
   */
  averagePrice: number;

  /**
   * Store offering the best price.
   */
  bestStore: string;

  /**
   * Potential savings.
   */
  savings: number;
}
