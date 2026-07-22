import type { Offer } from "../../models/Offer.js";
import { ProductNormalizationService } from "./ProductNormalizationService.js";
/**
 * Represents a collection of marketplace offers that have been
 * deterministically identified as referring to the same product.
 *
 * Example:
 *
 * Comparison Key:
 * iphone-15-pro-max-256gb-apple
 *
 * Offers:
 * - Jumia
 * - Konga
 * - Slot
 */
export interface OfferGroup {
    /**
     * A normalized identifier generated from the product title and brand.
     * This key is used to group similar marketplace listings.
     */
    comparisonKey: string;
    /**
     * All marketplace offers that belong to this product group.
     */
    offers: Offer[];
}
/**
 * Performs deterministic product matching.
 *
 * ----------------------------------------------------------------------------
 * Responsibilities
 * ----------------------------------------------------------------------------
 * - Generates a comparison key for every marketplace offer.
 * - Groups offers sharing the same comparison key.
 * - Produces product groups for downstream comparison.
 *
 * ----------------------------------------------------------------------------
 * This class DOES NOT:
 * ----------------------------------------------------------------------------
 * ✘ Perform AI semantic matching
 * ✘ Compare prices
 * ✘ Rank offers
 * ✘ Select the best offer
 * ✘ Fetch marketplace data
 *
 * AI-based similarity matching will be introduced in a later phase.
 */
export declare class DeterministicMatcher {
    private readonly normalizationService;
    constructor(normalizationService?: ProductNormalizationService);
    /**
     * Groups marketplace offers using deterministic matching rules.
     *
     * Workflow:
     *
     * 1. Normalize the product title and brand.
     * 2. Generate a comparison key.
     * 3. Place offers with the same key into the same group.
     * 4. Return all grouped offers.
     *
     * Example:
     *
     * Input:
     * ---------------------------------------------------------
     * Apple iPhone 15 Pro Max 256GB (Jumia)
     * Apple iPhone 15 Pro Max 256 GB (Konga)
     * APPLE IPHONE 15 PRO MAX 256GB (Slot)
     * ---------------------------------------------------------
     *
     * Output:
     * ---------------------------------------------------------
     * comparisonKey:
     * iphone-15-pro-max-256gb-apple
     *
     * offers:
     * - Jumia
     * - Konga
     * - Slot
     * ---------------------------------------------------------
     */
    match(offers: readonly Offer[]): OfferGroup[];
}
