import type { Offer } from "../../models/Offer.js";

import {
  DeterministicMatcher,
  type OfferGroup,
} from "./DeterministicMatcher.js";

/**
 * -----------------------------------------------------------------------------
 * Offer Matching Engine
 * -----------------------------------------------------------------------------
 *
 * The OfferMatchingEngine coordinates the marketplace matching pipeline.
 *
 * It is responsible for orchestrating the different matching strategies
 * without implementing the matching algorithms itself.
 *
 * Current Pipeline
 * ----------------
 * 1. Deterministic Matching
 *
 * Future Pipeline
 * ---------------
 * 1. Deterministic Matching
 * 2. AI Semantic Matching
 * 3. Confidence Scoring
 * 4. Canonical Product Selection
 *
 * This class intentionally delegates work to dedicated services so that
 * each matching strategy can evolve independently.
 */
export class OfferMatchingEngine {
  constructor(
    private readonly deterministicMatcher = new DeterministicMatcher(),
  ) {}

  /**
   * Executes the marketplace matching pipeline.
   *
   * @param offers Marketplace offers collected from all providers.
   *
   * @returns Groups of offers that represent the same product.
   */
  public match(offers: readonly Offer[]): OfferGroup[] {
    /**
     * Stage 1:
     * Group offers using deterministic normalization.
     */
    const deterministicGroups = this.deterministicMatcher.match(offers);

    /**
     * Future:
     *
     * const semanticGroups =
     *   await this.aiSemanticMatcher.match(deterministicGroups);
     *
     * return semanticGroups;
     */

    return deterministicGroups;
  }
}
