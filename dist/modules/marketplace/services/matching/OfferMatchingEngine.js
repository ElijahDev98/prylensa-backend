import { DeterministicMatcher, } from "./DeterministicMatcher.js";
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
export class OfferMatchingEngine {
    deterministicMatcher;
    constructor(deterministicMatcher = new DeterministicMatcher()) {
        this.deterministicMatcher = deterministicMatcher;
    }
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
    async match(offers) {
        /**
         * Stage 1:
         * Deterministic matching.
         */
        const deterministicGroups = this.deterministicMatcher.match(offers);
        return deterministicGroups;
    }
}
//# sourceMappingURL=OfferMatchingEngine.js.map