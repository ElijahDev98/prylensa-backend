import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "./offer-provider.interface.js";
/**
 * Retrieves product offers from Jumia Nigeria.
 *
 * The provider is responsible only for data acquisition and
 * normalization into the application's Offer model.
 */
export declare class JumiaProvider implements OfferProvider {
    /**
     * Name of the provider.
     */
    readonly store = "Jumia";
    /**
     * Base URL for Jumia Nigeria.
     */
    private static readonly BASE_URL;
    /**
     * Searches Jumia for products matching the supplied query.
     *
     * @param query Product search keyword.
     *
     * @returns Normalized Offer objects.
     */
    search(query: string): Promise<Offer[]>;
    /**
     * Converts a formatted price string into a number.
     */
    private parsePrice;
    /**
     * Extracts the discount percentage.
     */
    private parseDiscount;
    /**
     * Parses product rating and review count.
     */
    private parseRating;
    /**
     * Generates a stable offer identifier from the product URL.
     */
    private createOfferId;
}
