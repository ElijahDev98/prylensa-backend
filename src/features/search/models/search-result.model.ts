/**
 * Standard product returned by every search provider.
 *
 * All providers must normalize their results into this model.
 */
export interface SearchResult {
  /**
   * Stable unique identifier.
   */
  id: string;

  /**
   * Product title.
   */
  title: string;

  /**
   * Current selling price.
   */
  price: number;

  /**
   * ISO 4217 currency code.
   *
   * Example:
   * NGN
   */
  currency: string;

  /**
   * Original price before discount.
   */
  originalPrice?: number;

  /**
   * Discount percentage.
   */
  discountPercentage?: number;

  /**
   * Product rating.
   */
  rating?: number;

  /**
   * Number of customer reviews.
   */
  reviewCount?: number;

  /**
   * Product image URL.
   */
  image: string;

  /**
   * Product details page.
   */
  url: string;

  /**
   * Provider name.
   */
  store: string;
}
