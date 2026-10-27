/**
 * -----------------------------------------------------------------------------
 * File: Offer.ts
 * Module: Marketplace
 *
 * Description:
 * Defines the domain model for a marketplace offer. An Offer represents a
 * searchable listing returned by a marketplace such as Konga or Jumia.
 *
 * This model is provider-agnostic and is used throughout the application.
 * External API responses must be mapped into this model before leaving the
 * provider layer.
 *
 * Responsibilities:
 * - Represent a marketplace listing.
 * - Provide a unified contract across all marketplaces.
 * - Remain independent of external API schemas.
 * -----------------------------------------------------------------------------
 */

export interface Offer {
  /** Unique identifier of the marketplace offer. */
  id: string;

  /** Identifier of the underlying product. */
  productId: string;

  /** Product title displayed by the marketplace. */
  title: string;

  /** Product brand, if available. */
  brand?: string;

  /** Current selling price. */
  price: number;

  /** Original price before discount, if available. */
  originalPrice?: number;

  /** Marketplace-reported or price-derived discount percentage. */
  discountPercentage?: number;

  /** Currency code (e.g. NGN, USD). */
  currency: string;

  /** URL of the primary product image. */
  imageUrl: string;

  /** URL to the product page on the marketplace. */
  productUrl: string;

  /** Marketplace source (e.g. Konga, Jumia). */
  marketplace: string;

  /** Indicates whether the product is currently in stock. */
  inStock: boolean;

  /** Average customer rating, if available. */
  rating?: number;

  /** Whether the value came from the current provider call or a stored snapshot. */
  dataSource?: "live" | "persisted-snapshot";

  /** Observation timestamp when a persisted snapshot is used. */
  observedAt?: string;

  /** Whether current marketplace availability can be trusted. */
  availabilityStatus?: "in-stock" | "out-of-stock" | "unverified";
}
