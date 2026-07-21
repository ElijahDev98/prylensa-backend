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
 * - Coordinate business operations.
 * -----------------------------------------------------------------------------
 */
export class MarketplaceService {
    repository;
    /**
     * Creates a marketplace service.
     */
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Searches all configured marketplaces.
     *
     * @param query User search keyword.
     * @returns Marketplace offers.
     */
    async search(query) {
        const keyword = query.trim();
        if (!keyword) {
            throw new Error("Search query cannot be empty.");
        }
        return this.repository.search(keyword);
    }
}
//# sourceMappingURL=MarketplaceService.js.map