/**
 * Represents a single product offer from one e-commerce store.
 *
 * This is the normalized domain model produced by every provider.
 *
 * Example:
 * Jumia  -> Samsung Galaxy A56 -> ₦520,000
 * Konga  -> Samsung Galaxy A56 -> ₦515,000
 * Slot   -> Samsung Galaxy A56 -> ₦530,000
 *
 * These offers will later be grouped by the AI Matching Engine
 * to produce a comparison result.
 */
export interface Offer {
  /**
   * Unique identifier for the offer.
   *
   * Usually derived from the provider's product URL.
   */
  id: string;

  /**
   * Product title extracted from the provider.
   */
  title: string;

  /**
   * Current selling price.
   */
  price: number;

  /**
   * Currency code.
   *
   * Example:
   * NGN
   */
  currency: string;

  /**
   * Original price before discount.
   *
   * Optional because not every provider exposes it.
   */
  originalPrice?: number;

  /**
   * Percentage discount.
   *
   * Optional because not every provider exposes it.
   */
  discountPercentage?: number;

  /**
   * Average customer rating.
   *
   * Optional because some providers don't expose ratings.
   */
  rating?: number;

  /**
   * Number of customer reviews.
   *
   * Optional because some providers don't expose reviews.
   */
  reviewCount?: number;

  /**
   * Product image URL.
   */
  image: string;

  /**
   * Direct URL to the product page.
   */
  url: string;

  /**
   * Store that owns this offer.
   *
   * Example:
   * Jumia
   * Konga
   * Slot
   */
  store: string;
}
