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
 * - Validate search requests.
 * - Execute marketplace providers concurrently.
 * - Aggregate marketplace offers.
 * - Continue searching when individual providers fail.
 * - Record provider execution diagnostics.
 *
 * Responsibilities NOT included:
 * - Product matching
 * - Price comparison
 * - AI recommendation
 * - Business rules
 * -----------------------------------------------------------------------------
 */
export class MarketplaceRepository {
    providers;
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
        const normalizedQuery = query.trim();
        if (!normalizedQuery) {
            return [];
        }
        const executions = await Promise.allSettled(this.providers.map((provider) => this.executeProvider(provider, normalizedQuery)));
        const offers = [];
        for (const execution of executions) {
            if (execution.status !== "fulfilled") {
                continue;
            }
            offers.push(...execution.value.offers);
        }
        console.info(`[MarketplaceRepository] Search completed (${offers.length} offers).`);
        return offers;
    }
    /**
     * Executes a marketplace provider and records execution metrics.
     */
    async executeProvider(provider, query) {
        const providerName = provider.constructor.name;
        const startedAt = performance.now();
        try {
            const offers = await provider.search(query);
            const durationMs = Math.round(performance.now() - startedAt);
            console.info(`[${providerName}] Success | ${offers.length} offers | ${durationMs} ms`);
            return {
                provider: providerName,
                offers,
                durationMs,
            };
        }
        catch (error) {
            const durationMs = Math.round(performance.now() - startedAt);
            console.error(`[${providerName}] Failed | ${durationMs} ms`, error);
            return {
                provider: providerName,
                offers: [],
                durationMs,
            };
        }
    }
}
//# sourceMappingURL=MarketplaceRepository.js.map