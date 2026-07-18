import type { Offer } from "../../search/models/offer.model.js";
import { OfferCollector } from "../../search/services/offer-collector.service.js";

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
  /**
   * Creates a new ComparisonService.
   *
   * @param offerCollector Service responsible for collecting offers.
   */
  constructor(private readonly offerCollector: OfferCollector) {}

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
  public async compare(query: string): Promise<Offer[]> {
    return this.offerCollector.collect(query);
  }
}
