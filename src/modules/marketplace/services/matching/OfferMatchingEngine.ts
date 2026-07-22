/**
 * -----------------------------------------------------------------------------
 * File: OfferMatchingEngine.ts
 * Module: Marketplace
 *
 * Description:
 * Coordinates the marketplace offer matching pipeline.
 *
 * Current implementation performs deterministic normalization only.
 * AI semantic matching will be introduced in a later phase without
 * changing this class's public API.
 *
 * Responsibilities:
 * - Normalize marketplace offers.
 * - Produce deterministic comparison keys.
 * - Prepare offers for future matching stages.
 *
 * Responsibilities NOT included:
 * - AI semantic matching
 * - Price comparison
 * - Recommendation
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../../models/Offer.js";

import { ProductNormalizationService } from "./ProductNormalizationService.js";

export class OfferMatchingEngine {
  constructor(
    private readonly normalizationService = new ProductNormalizationService(),
  ) {}

  /**
   * Prepares marketplace offers for matching.
   *
   * This is the initial stage of the matching pipeline.
   * Grouping and AI semantic matching will be added later.
   */
  public prepare(offers: readonly Offer[]): readonly Offer[] {
    return offers.map((offer) => {
      const normalized = this.normalizationService.normalize(
        offer.title,
        offer.brand,
      );

      return {
        ...offer,
        title: normalized.title,
        brand: normalized.brand,
      };
    });
  }
}
