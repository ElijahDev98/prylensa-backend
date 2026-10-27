import type { Offer } from "../../models/Offer.js";
import { DeterministicMatcher, type OfferGroup } from "./DeterministicMatcher.js";
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
 * This stage creates stable candidate groups. Query relevance, ranking,
 * confidence scoring, price analysis and recommendations are performed by the
 * AI service before the backend exposes search results.
 *
 * This orchestration approach keeps each matching strategy isolated,
 * maintainable, and independently testable.
 * -----------------------------------------------------------------------------
 */
export declare class OfferMatchingEngine {
    private readonly deterministicMatcher;
    constructor(deterministicMatcher?: DeterministicMatcher);
    /**
     * Executes the complete offer matching pipeline.
     *
     * Workflow:
     *
     * 1. Deterministically group marketplace offers.
     * 2. Return candidate groups for AI relevance and analysis.
     *
     * @param offers Marketplace offers collected from providers.
     *
     * @returns Matched offer groups.
     */
    match(offers: readonly Offer[]): Promise<readonly OfferGroup[]>;
}
