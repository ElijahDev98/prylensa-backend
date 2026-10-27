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
import { OfferMatchingEngine } from "./matching/OfferMatchingEngine.js";
import { env } from "../../../app/config/environment.js";
export class MarketplaceService {
    repository;
    matchingEngine;
    cache = new Map();
    /**
     * Creates a marketplace service.
     */
    constructor(repository, matchingEngine = new OfferMatchingEngine()) {
        this.repository = repository;
        this.matchingEngine = matchingEngine;
    }
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
    async search(query, options) {
        /**
         * Remove leading and trailing whitespace.
         */
        const keyword = query.trim();
        /**
         * Prevent empty search requests.
         */
        if (!keyword) {
            throw new Error("Search query cannot be empty.");
        }
        const cacheKey = keyword.toLowerCase();
        const cached = this.cache.get(cacheKey);
        if (!options?.forceRefresh && cached && cached.expiresAt > Date.now()) {
            return cached.groups;
        }
        /**
         * Retrieve marketplace offers from every configured provider.
         */
        const offers = await this.repository.search(keyword);
        /**
         * Execute the marketplace matching pipeline.
         *
         * Candidate groups are resolved here. The controller sends them through
         * the required AI relevance, ranking and price-analysis stage before any
         * search response is returned.
         */
        const groups = await this.matchingEngine.match(offers);
        this.cache.set(cacheKey, {
            groups,
            expiresAt: Date.now() + env.MARKETPLACE_CACHE_TTL_MS,
        });
        return groups;
    }
}
//# sourceMappingURL=MarketplaceService.js.map