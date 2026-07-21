/**
 * Collects product offers from every registered provider.
 *
 * This service acts as the application's data acquisition layer.
 *
 * It knows nothing about AI matching, comparison,
 * recommendations or analytics.
 */
export class OfferCollector {
    providers;
    /**
     * Creates a new OfferCollector.
     *
     * @param providers Registered offer providers.
     */
    constructor(providers) {
        this.providers = providers;
    }
    /**
     * Searches every provider for the supplied query
     * and merges the returned offers.
     *
     * @param query Product search keyword.
     *
     * @returns Combined offers from all providers.
     */
    async collect(query) {
        const results = await Promise.all(this.providers.map((provider) => provider.search(query)));
        return results.flat();
    }
}
//# sourceMappingURL=offer-collector.service.js.map