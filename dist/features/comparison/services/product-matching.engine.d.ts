import type { MatchedProduct } from "../models/matched-product.model.js";
import type { Offer } from "../../search/models/offer.model.js";
/**
 * Groups offers that represent the same product.
 *
 * This initial implementation is intentionally simple.
 * It groups offers by their normalized title.
 *
 * In a future milestone this engine will be replaced with
 * an AI-powered semantic matching implementation without
 * affecting the rest of the application.
 */
export declare class ProductMatchingEngine {
    /**
     * Groups offers into matched products.
     *
     * @param offers Normalized offers collected from providers.
     *
     * @returns Matched products.
     */
    match(offers: Offer[]): MatchedProduct[];
    /**
     * Produces a normalized title used for temporary grouping.
     *
     * NOTE:
     * This is a placeholder implementation and will be replaced
     * by AI semantic matching in a later milestone.
     */
    private normalizeTitle;
}
