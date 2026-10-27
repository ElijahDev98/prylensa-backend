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
import { prisma } from "../../../shared/database/index.js";
import { OfferFreshnessReconciler } from "../services/matching/OfferFreshnessReconciler.js";
import { MARKETPLACE_FALLBACK_OFFER_TARGET } from "../constants/marketplace-search.constants.js";
export class MarketplaceRepository {
    providers;
    freshnessReconciler;
    completedByQuery = new Map();
    refreshes = new Map();
    constructor(providers, freshnessReconciler = new OfferFreshnessReconciler()) {
        this.providers = providers;
        this.freshnessReconciler = freshnessReconciler;
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
        const key = normalizedQuery.toLowerCase();
        await this.ensureRefresh(key, normalizedQuery);
        const liveOffers = [...(this.completedByQuery.get(key)?.values() ?? [])].flat();
        const expectedMarketplaces = this.providers.map((provider) => provider.name);
        const persistedOffers = await this.getPersistedOffers(normalizedQuery, expectedMarketplaces);
        const offers = this.freshnessReconciler.reconcileCandidates([
            ...liveOffers,
            ...persistedOffers,
        ]);
        console.info(`[MarketplaceRepository] Search completed (${offers.length} offers).`);
        return offers;
    }
    async getPersistedOffers(query, marketplaces) {
        const tokens = query.toLowerCase().match(/[a-z0-9]+/g)?.filter((token) => token.length >= 2) ?? [];
        if (tokens.length === 0)
            return [];
        const listings = (await Promise.all(marketplaces.map((marketplace) => prisma.marketplaceListing.findMany({
            where: {
                marketplace: { equals: marketplace, mode: "insensitive" },
                AND: tokens.map((token) => ({ normalizedTitle: { contains: token } })),
            },
            include: {
                snapshots: { orderBy: { lastObservedAt: "desc" }, take: 1 },
            },
            orderBy: { lastSeenAt: "desc" },
            take: MARKETPLACE_FALLBACK_OFFER_TARGET,
        })))).flat();
        const counts = new Map();
        return listings.flatMap((listing) => {
            const snapshot = listing.snapshots[0];
            const key = listing.marketplace.toLowerCase();
            const count = counts.get(key) ?? 0;
            if (!snapshot || count >= MARKETPLACE_FALLBACK_OFFER_TARGET)
                return [];
            counts.set(key, count + 1);
            return [{
                    id: `${listing.marketplace}:${listing.externalOfferId}`,
                    productId: listing.externalProductId ?? listing.canonicalKey,
                    title: listing.title,
                    brand: listing.brand ?? undefined,
                    price: Number(snapshot.price),
                    originalPrice: snapshot.originalPrice
                        ? Number(snapshot.originalPrice)
                        : undefined,
                    currency: snapshot.currency,
                    imageUrl: listing.imageUrl ?? "",
                    productUrl: listing.productUrl ?? "",
                    marketplace: listing.marketplace,
                    inStock: snapshot.inStock,
                    rating: snapshot.rating ?? undefined,
                    dataSource: "persisted-snapshot",
                    observedAt: snapshot.lastObservedAt.toISOString(),
                }];
        });
    }
    ensureRefresh(key, query) {
        const current = this.refreshes.get(key);
        if (current)
            return current;
        const providerResults = this.completedByQuery.get(key) ?? new Map();
        this.completedByQuery.set(key, providerResults);
        const tasks = this.providers.map(async (provider) => {
            const result = await this.executeProvider(provider, query);
            providerResults.set(result.provider, result.offers);
        });
        const refresh = Promise.all(tasks)
            .then(() => undefined)
            .finally(() => this.refreshes.delete(key));
        this.refreshes.set(key, refresh);
        void refresh.catch((error) => {
            console.error(`[MarketplaceRepository] Background refresh failed for ${query}.`, error);
        });
        return refresh;
    }
    /**
     * Executes a marketplace provider and records execution metrics.
     */
    async executeProvider(provider, query) {
        const providerName = provider.name;
        const startedAt = performance.now();
        try {
            const observedAt = new Date().toISOString();
            const offers = (await provider.search(query)).map((offer) => ({
                ...offer,
                dataSource: "live",
                observedAt,
            }));
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