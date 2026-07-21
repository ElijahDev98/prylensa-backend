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
export declare class OfferCollector {
    private readonly providers;
    /**
     * Creates a new OfferCollector.
     *
     * @param providers Registered offer providers.
     */
    constructor(providers: readonly OfferProvider[]);
    /**
     * Searches every provider for the supplied query
     * and merges the returned offers.
     *
     * @param query Product search keyword.
     *
     * @returns Combined offers from all providers.
     */
    collect(query: string): Promise<Offer[]>;
}
