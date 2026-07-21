/**
 * Coordinates the product comparison workflow.
 *
 * This service acts as the application's orchestration layer.
 *
 * Current Responsibilities:
 * - Collect offers from all registered providers.
 *
 * Future Responsibilities:
 * - Invoke the AI Product Matching Engine.
 * - Generate product comparisons.
 * - Invoke the Recommendation Engine.
 */
export class ComparisonService {
    offerCollector;
    /**
     * Creates a new ComparisonService.
     *
     * @param offerCollector Service responsible for collecting offers.
     */
    constructor(offerCollector) {
        this.offerCollector = offerCollector;
    }
    /**
     * Executes the first stage of the comparison pipeline.
     *
     * Currently this method only collects normalized offers.
     *
     * Later milestones will extend this method to perform:
     *
     * Offer[]
     *   ↓
     * AI Matching
     *   ↓
     * MatchedProduct[]
     *   ↓
     * Comparison[]
     *
     * @param query Product search keyword.
     *
     * @returns Normalized offers.
     */
    async compare(query) {
        return this.offerCollector.collect(query);
    }
}
//# sourceMappingURL=comparison.service.js.map