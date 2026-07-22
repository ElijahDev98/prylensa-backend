import type { Offer } from "../../models/Offer.js";

import {
  DeterministicMatcher,
  type OfferGroup,
} from "./DeterministicMatcher.js";
import { AiSemanticMatcher } from "./AiSemanticMatcher.js";

/**
 * -----------------------------------------------------------------------------
 * Offer Matching Engine
 * -----------------------------------------------------------------------------
 *
 * Coordinates the marketplace offer matching pipeline.
 *
 * This class does not implement any matching algorithm itself.
 * Instead, it delegates each stage of the pipeline to specialized services.
 *
 * Current Pipeline
 * ----------------
 * 1. Deterministic Matching
 * 2. AI Semantic Matching (Placeholder)
 *
 * Future Pipeline
 * ---------------
 * 1. Deterministic Matching
 * 2. AI Semantic Matching
 * 3. Confidence Scoring
 * 4. Canonical Product Resolution
 *
 * This orchestration approach keeps each matching strategy isolated,
 * maintainable, and independently testable.
 * -----------------------------------------------------------------------------
 */
export class OfferMatchingEngine {
  constructor(
    private readonly deterministicMatcher = new DeterministicMatcher(),
    private readonly aiSemanticMatcher = new AiSemanticMatcher(),
  ) {}

  /**
   * Executes the complete offer matching pipeline.
   *
   * Workflow:
   *
   * 1. Deterministically group marketplace offers.
   * 2. Refine those groups using semantic AI matching.
   * 3. Return the final grouped offers.
   *
   * @param offers Marketplace offers collected from providers.
   *
   * @returns Matched offer groups.
   */
  public async match(offers: readonly Offer[]): Promise<readonly OfferGroup[]> {
    /**
     * Stage 1:
     * Deterministic matching.
     */
    const deterministicGroups = this.deterministicMatcher.match(offers);

    /**
     * Stage 2:
     * AI semantic refinement.
     *
     * Current implementation simply returns the deterministic groups.
     * Future implementation will communicate with the FastAPI AI service.
     */
    return this.aiSemanticMatcher.match(deterministicGroups);
  }
}
