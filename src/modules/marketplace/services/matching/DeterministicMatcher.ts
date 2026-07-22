import type { Offer } from "../../models/Offer.js";

import { ProductNormalizationService } from "./ProductNormalizationService.js";

/**
 * Represents a collection of marketplace offers that have been
 * deterministically identified as referring to the same product.
 *
 * Example:
 *
 * Comparison Key:
 * iphone-15-pro-max-256gb-apple
 *
 * Offers:
 * - Jumia
 * - Konga
 * - Slot
 */
export interface OfferGroup {
  /**
   * A normalized identifier generated from the product title and brand.
   * This key is used to group similar marketplace listings.
   */
  comparisonKey: string;

  /**
   * All marketplace offers that belong to this product group.
   */
  offers: Offer[];
}

/**
 * Performs deterministic product matching.
 *
 * ----------------------------------------------------------------------------
 * Responsibilities
 * ----------------------------------------------------------------------------
 * - Generates a comparison key for every marketplace offer.
 * - Groups offers sharing the same comparison key.
 * - Produces product groups for downstream comparison.
 *
 * ----------------------------------------------------------------------------
 * This class DOES NOT:
 * ----------------------------------------------------------------------------
 * ✘ Perform AI semantic matching
 * ✘ Compare prices
 * ✘ Rank offers
 * ✘ Select the best offer
 * ✘ Fetch marketplace data
 *
 * AI-based similarity matching will be introduced in a later phase.
 */
export class DeterministicMatcher {
  constructor(
    private readonly normalizationService = new ProductNormalizationService(),
  ) {}

  /**
   * Groups marketplace offers using deterministic matching rules.
   *
   * Workflow:
   *
   * 1. Normalize the product title and brand.
   * 2. Generate a comparison key.
   * 3. Place offers with the same key into the same group.
   * 4. Return all grouped offers.
   *
   * Example:
   *
   * Input:
   * ---------------------------------------------------------
   * Apple iPhone 15 Pro Max 256GB (Jumia)
   * Apple iPhone 15 Pro Max 256 GB (Konga)
   * APPLE IPHONE 15 PRO MAX 256GB (Slot)
   * ---------------------------------------------------------
   *
   * Output:
   * ---------------------------------------------------------
   * comparisonKey:
   * iphone-15-pro-max-256gb-apple
   *
   * offers:
   * - Jumia
   * - Konga
   * - Slot
   * ---------------------------------------------------------
   */
  public match(offers: readonly Offer[]): OfferGroup[] {
    /**
     * Stores grouped offers using the generated comparison key.
     *
     * Key:
     *   Normalized comparison key.
     *
     * Value:
     *   Marketplace offers belonging to that product.
     */
    const groups = new Map<string, Offer[]>();

    for (const offer of offers) {
      /**
       * Generate a deterministic key from the normalized
       * product title and brand.
       */
      const comparisonKey = this.normalizationService.createComparisonKey(
        offer.title,
        offer.brand,
      );

      /**
       * Retrieve an existing group if one has already been created.
       */
      const existingGroup = groups.get(comparisonKey);

      if (existingGroup) {
        /**
         * Add the offer to the existing product group.
         */
        existingGroup.push(offer);
      } else {
        /**
         * Create a new group for this product.
         */
        groups.set(comparisonKey, [offer]);
      }
    }

    /**
     * Convert the internal Map into a serializable array
     * that can be consumed by the matching engine.
     */
    return Array.from(groups.entries()).map(
      ([comparisonKey, offers]): OfferGroup => ({
        comparisonKey,
        offers,
      }),
    );
  }
}
