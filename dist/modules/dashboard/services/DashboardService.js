/**
 * -----------------------------------------------------------------------------
 * File: DashboardService.ts
 * Module: Dashboard
 *
 * Purpose:
 * Builds dashboard intelligence from marketplace search results.
 * -----------------------------------------------------------------------------
 */
import { SearchResponseMapper } from "../../marketplace/mappers/SearchResponseMapper.js";
import { prisma } from "../../../shared/database/index.js";
const MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE = 80;
export class DashboardService {
    marketplaceService;
    aiService;
    recommendationService;
    searchResponseMapper;
    constructor(marketplaceService, aiService, recommendationService, searchResponseMapper = new SearchResponseMapper()) {
        this.marketplaceService = marketplaceService;
        this.aiService = aiService;
        this.recommendationService = recommendationService;
        this.searchResponseMapper = searchResponseMapper;
    }
    async getDashboard(userId) {
        const [persistedProducts, persistedRecommendations, priceAlerts, recentComparisons] = await Promise.all([
            this.getPersistedTrendingProducts(userId),
            this.recommendationService.list(userId, 12),
            this.getPersistedPriceAlerts(userId),
            this.getPersistedComparisons(userId),
        ]);
        const recommendations = persistedRecommendations.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            priority: item.priority,
            feedback: item.feedback,
        }));
        if (persistedProducts.length > 0) {
            return {
                metrics: await this.getPersistedMetrics(persistedProducts),
                trendingProducts: persistedProducts,
                recommendations,
                priceAlerts,
                recentComparisons,
                generatedAt: new Date().toISOString(),
            };
        }
        const monitoredQueries = await this.getUserQueries(userId);
        if (monitoredQueries.length === 0) {
            return {
                metrics: await this.getPersistedMetrics([]),
                trendingProducts: [],
                recommendations,
                priceAlerts,
                recentComparisons,
                generatedAt: new Date().toISOString(),
            };
        }
        const searchResults = await Promise.allSettled(monitoredQueries.map(async (query) => ({
            query,
            groups: await this.marketplaceService.search(query),
        })));
        const candidates = searchResults.flatMap((result) => this.toDashboardCandidates(result));
        const aiAnalyses = await this.getAiAnalyses(searchResults);
        const aiByProductId = new Map(aiAnalyses.map((analysis) => [analysis.id, analysis]));
        const trendingProducts = candidates
            .map((candidate) => {
            const analysis = aiByProductId.get(candidate.group.comparisonKey);
            return analysis
                ? this.toTrendingProduct(candidate, analysis)
                : null;
        })
            .filter((product) => product !== null)
            .sort((left, right) => right.qualityScore - left.qualityScore)
            .slice(0, 6);
        if (trendingProducts.length === 0) {
            throw new Error("No live dashboard data is currently available.");
        }
        return {
            metrics: this.toMetrics(trendingProducts),
            trendingProducts,
            recommendations: recommendations.length > 0
                ? recommendations
                : this.toRecommendations(trendingProducts, aiAnalyses),
            priceAlerts,
            recentComparisons,
            generatedAt: new Date().toISOString(),
        };
    }
    async getPersistedTrendingProducts(userId) {
        const queries = await this.getUserQueries(userId);
        if (queries.length === 0)
            return [];
        const tokens = [...new Set(queries.flatMap((query) => query.toLowerCase().match(/[a-z0-9]+/g)?.filter((token) => token.length >= 2) ?? []))];
        const listings = await prisma.marketplaceListing.findMany({
            where: tokens.length > 0
                ? { OR: tokens.map((token) => ({ normalizedTitle: { contains: token } })) }
                : undefined,
            orderBy: { lastSeenAt: "desc" },
            take: 200,
            include: {
                snapshots: {
                    orderBy: { lastObservedAt: "desc" },
                    take: 7,
                },
            },
        });
        const grouped = new Map();
        for (const listing of listings) {
            if (listing.snapshots.length === 0)
                continue;
            const group = grouped.get(listing.canonicalKey) ?? [];
            group.push(listing);
            grouped.set(listing.canonicalKey, group);
        }
        return [...grouped.entries()]
            .map(([canonicalKey, group]) => {
            const currentOffers = group.flatMap((listing) => {
                const snapshot = listing.snapshots[0];
                return snapshot ? [{ listing, snapshot }] : [];
            });
            const best = [...currentOffers].sort((left, right) => Number(left.snapshot.price) - Number(right.snapshot.price))[0];
            if (!best)
                return null;
            const previous = best.listing.snapshots[1];
            const currentPrice = Number(best.snapshot.price);
            const previousPrice = previous
                ? Number(previous.price)
                : currentPrice;
            const rawPriceChangePercentage = previousPrice > 0
                ? Math.round(((currentPrice - previousPrice) / previousPrice) * 100)
                : 0;
            const priceChangePercentage = Math.abs(rawPriceChangePercentage) <=
                MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE
                ? rawPriceChangePercentage
                : 0;
            const ratings = currentOffers
                .map((offer) => offer.snapshot.rating)
                .filter((rating) => rating !== null);
            const averageRating = ratings.length > 0
                ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
                : 3.5;
            const reviewCount = Math.max(...currentOffers.map((offer) => offer.snapshot.reviewCount ?? 0), 0);
            const inStockRatio = currentOffers.filter((offer) => offer.snapshot.inStock).length /
                Math.max(currentOffers.length, 1);
            const stores = [...new Set(group.map((listing) => listing.marketplace))];
            const qualityScore = Math.round((averageRating / 5) * 45 +
                Math.min(reviewCount / 500, 1) * 10 +
                inStockRatio * 20 +
                Math.min(stores.length / 4, 1) * 25);
            const trendHistory = [...best.listing.snapshots]
                .reverse()
                .map((snapshot) => Number(snapshot.price))
                .filter((price) => {
                if (currentPrice <= 0 || price <= 0)
                    return false;
                const movement = Math.abs(((price - currentPrice) / price) * 100);
                return movement <= MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE;
            });
            const product = {
                id: canonicalKey,
                name: best.listing.title,
                category: best.listing.category ?? best.listing.brand ?? "Marketplace product",
                currentPrice,
                averagePrice: Math.round(currentOffers.reduce((total, offer) => total + Number(offer.snapshot.price), 0) / currentOffers.length),
                priceChangePercentage,
                trend: priceChangePercentage > 0 ? "up" : "down",
                stores,
                bestPriceStore: best.listing.marketplace,
                isBestPrice: true,
                trendHistory,
                thumbnail: best.listing.imageUrl ?? undefined,
                qualityScore,
                qualityLabel: this.getQualityLabel(qualityScore),
            };
            return product;
        })
            .filter((product) => product !== null)
            .sort((left, right) => right.qualityScore - left.qualityScore)
            .slice(0, 12);
    }
    async getUserQueries(userId) {
        const history = await prisma.searchHistory.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 8,
            select: { query: true },
            distinct: ["query"],
        });
        return history.map((item) => item.query.trim()).filter(Boolean);
    }
    async getPersistedPriceAlerts(userId) {
        const events = await prisma.alertEvent.findMany({
            where: { userId },
            orderBy: { triggeredAt: "desc" },
            take: 8,
        });
        return events.flatMap((event) => {
            const metadata = event.metadata && typeof event.metadata === "object" && !Array.isArray(event.metadata)
                ? event.metadata
                : {};
            const currentPrice = Number(metadata.currentPrice ?? metadata.price ?? 0);
            const previousPrice = Number(metadata.previousPrice ?? currentPrice);
            if (!Number.isFinite(currentPrice) || currentPrice <= 0)
                return [];
            return [{
                    id: event.id,
                    product: event.productQuery,
                    store: String(metadata.marketplace ?? "Marketplace"),
                    currentPrice,
                    previousPrice,
                    direction: currentPrice > previousPrice ? "up" : "down",
                }];
        });
    }
    async getPersistedComparisons(userId) {
        const workspace = await prisma.comparisonWorkspace.findUnique({ where: { userId } });
        if (!workspace || !Array.isArray(workspace.items))
            return [];
        return workspace.items.slice(0, 4).flatMap((value) => {
            if (!value || typeof value !== "object" || Array.isArray(value))
                return [];
            const item = value;
            const offers = Array.isArray(item.offers)
                ? item.offers.filter((offer) => Boolean(offer) && typeof offer === "object" && !Array.isArray(offer))
                : [];
            const prices = offers.map((offer) => Number(offer.currentPrice)).filter((price) => price > 0);
            return [{
                    id: String(item.id ?? crypto.randomUUID()),
                    product: String(item.title ?? "Compared product"),
                    comparedStores: new Set(offers.map((offer) => String(offer.storeId ?? ""))).size,
                    bestPrice: prices.length > 0 ? Math.min(...prices) : 0,
                    comparedAt: workspace.updatedAt.toISOString(),
                }];
        });
    }
    toDashboardCandidates(result) {
        if (result.status === "rejected") {
            return [];
        }
        return result.value.groups.map((group) => ({
            query: result.value.query,
            group,
        }));
    }
    async getAiAnalyses(searchResults) {
        const successfulResults = searchResults.filter((result) => result.status === "fulfilled");
        const aiResponses = await Promise.all(successfulResults.map((result) => this.aiService.analyzeMarketplaceGroups(result.value.query, this.searchResponseMapper.toDtoList(result.value.groups))));
        return aiResponses.flatMap((response) => response.analyses);
    }
    toTrendingProduct(candidate, analysis) {
        const representativeOffer = candidate.group.offers[0];
        const bestOffer = this.getBestOffer(candidate.group);
        if (!representativeOffer || !bestOffer) {
            return null;
        }
        // A provider's original price is discount evidence, not a historical
        // observation. Live-only results establish a baseline until PostgreSQL
        // contains a later snapshot.
        const priceChangePercentage = 0;
        const qualityScore = Math.round(analysis.evaluation_score);
        return {
            id: candidate.group.comparisonKey,
            name: representativeOffer.title,
            category: representativeOffer.brand ?? candidate.query,
            currentPrice: bestOffer.price,
            averagePrice: this.getAveragePrice(candidate.group.offers),
            priceChangePercentage,
            trend: priceChangePercentage > 0 ? "up" : "down",
            stores: this.getUniqueMarketplaces(candidate.group.offers),
            bestPriceStore: bestOffer.marketplace,
            isBestPrice: true,
            trendHistory: [bestOffer.price],
            thumbnail: representativeOffer.imageUrl,
            qualityScore,
            qualityLabel: this.getQualityLabel(qualityScore),
        };
    }
    getBestOffer(group) {
        return [...group.offers].sort((left, right) => left.price - right.price)[0];
    }
    getAveragePrice(offers) {
        if (offers.length === 0) {
            return 0;
        }
        return Math.round(offers.reduce((total, offer) => total + offer.price, 0) / offers.length);
    }
    getUniqueMarketplaces(offers) {
        return [...new Set(offers.map((offer) => offer.marketplace))];
    }
    getQualityLabel(score) {
        if (score >= 85) {
            return "Excellent";
        }
        if (score >= 70) {
            return "Strong";
        }
        if (score >= 50) {
            return "Fair";
        }
        return "Limited";
    }
    async getPersistedMetrics(products) {
        const [canonicalProducts, offers, marketplaces] = await Promise.all([
            prisma.marketplaceListing.groupBy({ by: ["canonicalKey"] }),
            prisma.marketplaceListing.count(),
            prisma.marketplaceListing.groupBy({ by: ["marketplace"] }),
        ]);
        const priceDrops = products.filter((product) => product.priceChangePercentage < 0).length;
        return [
            {
                id: "products",
                label: "Products Tracked",
                value: canonicalProducts.length,
                changePercentage: 0,
            },
            {
                id: "price-drops",
                label: "Price Drops",
                value: priceDrops,
                changePercentage: priceDrops > 0 ? 100 : 0,
            },
            {
                id: "offers",
                label: "Marketplace Offers",
                value: offers,
                changePercentage: 0,
            },
            {
                id: "stores",
                label: "Stores Monitored",
                value: marketplaces.length,
                changePercentage: 0,
            },
        ];
    }
    toMetrics(products) {
        const stores = new Set(products.flatMap((product) => product.stores));
        const priceDrops = products.filter((product) => product.priceChangePercentage < 0).length;
        const offers = products.reduce((total, product) => total + product.stores.length, 0);
        return [
            {
                id: "products",
                label: "Products Tracked",
                value: products.length,
                changePercentage: 0,
            },
            {
                id: "price-drops",
                label: "Price Drops",
                value: priceDrops,
                changePercentage: priceDrops > 0 ? 100 : 0,
            },
            {
                id: "offers",
                label: "Marketplace Offers",
                value: offers,
                changePercentage: 0,
            },
            {
                id: "stores",
                label: "Stores Monitored",
                value: stores.size,
                changePercentage: 0,
            },
        ];
    }
    toRecommendations(products, aiAnalyses) {
        if (aiAnalyses.length > 0) {
            return aiAnalyses.slice(0, 3).map((analysis) => ({
                id: `${analysis.id}-ai`,
                title: `${analysis.recommendation.action}: ${analysis.title}`,
                description: `${analysis.insight} ${analysis.recommendation.reason}`,
                priority: analysis.recommendation.priority,
            }));
        }
        return products.slice(0, 3).map((product) => {
            if (product.qualityScore >= 80 && product.priceChangePercentage <= 0) {
                return {
                    id: `${product.id}-quality`,
                    title: `Prioritize ${product.name}`,
                    description: `${product.qualityLabel} product quality with a competitive live marketplace price.`,
                    priority: "high",
                };
            }
            if (product.priceChangePercentage > 0) {
                return {
                    id: `${product.id}-wait`,
                    title: `Review ${product.name} before buying`,
                    description: "The best available price is currently above its reference price.",
                    priority: "medium",
                };
            }
            return {
                id: `${product.id}-compare`,
                title: `Compare ${product.name}`,
                description: `${product.stores.length} marketplace offers are available for review.`,
                priority: "low",
            };
        });
    }
}
//# sourceMappingURL=DashboardService.js.map