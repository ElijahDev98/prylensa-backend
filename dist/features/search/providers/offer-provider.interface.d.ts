import type { Offer } from "../models/offer.model.js";
/**
 * Contract implemented by every e-commerce provider.
 *
 * Examples:
 * - JumiaProvider
 * - KongaProvider
 * - SlotProvider
 *
 * Every provider must return normalized Offer objects,
 * regardless of how the underlying website is accessed.
 */
export interface OfferProvider {
    /**
     * Human-readable store name.
     *
     * Examples:
     * - Jumia
     * - Konga
     * - Slot
     */
    readonly store: string;
    /**
     * Searches the provider for products matching the query.
     *
     * @param query Product search keyword.
     *
     * @returns Normalized product offers.
     */
    search(query: string): Promise<Offer[]>;
}
