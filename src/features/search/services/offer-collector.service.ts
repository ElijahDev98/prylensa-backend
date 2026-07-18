import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "../providers/offer-provider.interface.js";

/**
 * Collects product offers from every registered provider.
 *
 * This service acts as the application's data acquisition layer.
 *
 * It knows nothing about AI matching, comparison,
 * recommendations or analytics.
 */
export class OfferCollector {
  /**
   * Creates a new OfferCollector.
   *
   * @param providers Registered offer providers.
   */
  constructor(private readonly providers: readonly OfferProvider[]) {}

  /**
   * Searches every provider for the supplied query
   * and merges the returned offers.
   *
   * @param query Product search keyword.
   *
   * @returns Combined offers from all providers.
   */
  public async collect(query: string): Promise<Offer[]> {
    const results = await Promise.all(
      this.providers.map((provider) => provider.search(query)),
    );

    return results.flat();
  }
}
