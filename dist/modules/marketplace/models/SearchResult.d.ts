/**
 * -----------------------------------------------------------------------------
 * File: SearchResult.ts
 * Module: Marketplace
 *
 * Description:
 * Represents the standardized result of a marketplace search operation.
 *
 * Responsibilities:
 * - Encapsulate search results.
 * - Provide pagination metadata.
 * - Hide provider-specific response structures.
 * -----------------------------------------------------------------------------
 */
import { Offer } from "./Offer.js";
export interface SearchResult {
    /** Collection of marketplace offers. */
    offers: Offer[];
    /** Total number of matching products. */
    total: number;
    /** Current page number. */
    page: number;
    /** Indicates whether another page of results exists. */
    hasNextPage: boolean;
}
