/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceService.ts
 * Module: Marketplace
 *
 * Description:
 * Encapsulates marketplace business logic.
 *
 * Responsibilities:
 * - Validate incoming search requests.
 * - Retrieve marketplace offers from the repository.
 * - Execute the offer matching pipeline.
 * - Coordinate marketplace business operations.
 * -----------------------------------------------------------------------------
 */
import { MarketplaceRepository } from "../repositories/MarketplaceRepository.js";
import { OfferMatchingEngine } from "./matching/OfferMatchingEngine.js";
import type { OfferGroup } from "./matching/DeterministicMatcher.js";
export declare class MarketplaceService {
    private readonly repository;
    private readonly matchingEngine;
    private readonly cache;
    /**
     * Creates a marketplace service.
     */
    constructor(repository: MarketplaceRepository, matchingEngine?: OfferMatchingEngine);
    /**
     * Searches all configured marketplaces.
     *
     * Workflow:
     *
     * 1. Validate the search query.
     * 2. Retrieve marketplace offers.
     * 3. Execute the matching pipeline.
     * 4. Return grouped marketplace offers.
     *
     * @param query User search keyword.
     *
     * @returns Matched marketplace offer groups.
     */
    search(query: string, options?: {
        forceRefresh?: boolean;
    }): Promise<readonly OfferGroup[]>;
}
