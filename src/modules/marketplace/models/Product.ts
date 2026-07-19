/**
 * -----------------------------------------------------------------------------
 * File: Product.ts
 * Module: Marketplace
 *
 * Description:
 * Represents the complete product information retrieved from a marketplace.
 * This model is typically populated after selecting an offer and fetching
 * detailed product information.
 *
 * Responsibilities:
 * - Store detailed product information.
 * - Provide a unified model for AI analysis.
 * - Remain independent of marketplace-specific implementations.
 * -----------------------------------------------------------------------------
 */

export interface Product {
  /** Unique product identifier. */
  id: string;

  /** Product title. */
  title: string;

  /** Manufacturer or brand. */
  brand?: string;

  /** Product description. */
  description?: string;

  /** Current selling price. */
  price: number;

  /** Original price before discount. */
  originalPrice?: number;

  /** Currency code. */
  currency: string;

  /** Product image URL. */
  imageUrl: string;

  /** Marketplace product URL. */
  productUrl: string;

  /** Technical specifications as key-value pairs. */
  specifications: Record<string, string>;

  /** Indicates product availability. */
  inStock: boolean;
}
