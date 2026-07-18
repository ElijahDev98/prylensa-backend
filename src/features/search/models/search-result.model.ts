/**
 * Represents a normalized product returned
 * from any supported e-commerce platform.
 */
export interface SearchResultModel {
  /**
   * Store name.
   */
  store: string;

  /**
   * Product title.
   */
  title: string;

  /**
   * Product price.
   */
  price: number;

  /**
   * Currency code.
   * Example: NGN
   */
  currency: string;

  /**
   * Product detail page.
   */
  productUrl: string;

  /**
   * Product image.
   */
  imageUrl: string;

  /**
   * Product availability.
   */
  inStock: boolean;
}
