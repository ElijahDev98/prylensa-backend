/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceRepository.ts
 * Module: Marketplace
 *
 * Description:
 * Coordinates marketplace providers and exposes a unified interface for
 * retrieving marketplace offers.
 *
 * Responsibilities:
 * - Execute searches across registered marketplace providers.
 * - Aggregate offers into a single collection.
 * - Isolate higher layers from provider implementations.
 * - Continue searching even if one provider fails.
 * -----------------------------------------------------------------------------
 */
export class MarketplaceRepository {
    providers;
    /**
     * Registered marketplace providers.
     */
    constructor(providers) {
        this.providers = providers;
    }
    /**
     * Searches every registered marketplace.
     *
     * @param query User search keyword.
     * @returns Aggregated marketplace offers.
     */
    async search(query) {
        const results = await Promise.allSettled(this.providers.map((provider) => provider.search(query)));
        const offers = [];
        for (const result of results) {
            if (result.status === "fulfilled") {
                offers.push(...result.value);
            }
            else {
                console.error("Marketplace Provider Failed");
                console.error(result.reason);
            }
        }
        return offers;
    }
}
//# sourceMappingURL=MarketplaceRepository.js.map