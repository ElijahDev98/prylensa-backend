import { createHash } from "node:crypto";
import { prisma } from "../../../shared/database/index.js";
export class SearchDatasetService {
    async captureSearch(input) {
        const normalizedQuery = this.normalizeText(input.query);
        const offers = input.groups.flatMap((group) => group.offers);
        const marketplaceCount = new Set(offers.map((offer) => this.normalizeText(offer.marketplace))).size;
        const aiGeneratedAt = this.parseDate(input.aiGeneratedAt);
        return prisma.$transaction(async (transaction) => {
            const search = await transaction.marketplaceSearch.create({
                data: {
                    query: input.query.trim(),
                    normalizedQuery,
                    resultCount: input.groups.length,
                    offerCount: offers.length,
                    marketplaceCount,
                    aiGeneratedAt,
                },
            });
            let observations = 0;
            let newSnapshots = 0;
            let reusedSnapshots = 0;
            const seenOfferKeys = new Set();
            const observedSnapshotIds = new Set();
            for (const [groupPosition, group] of input.groups.entries()) {
                const representative = group.offers[0];
                if (!representative)
                    continue;
                const brandName = representative.brand?.trim() || "Unknown brand";
                const categoryName = this.optionalText(representative, "category") || "Uncategorized";
                const brandSlug = this.slugify(brandName);
                const categorySlug = this.slugify(categoryName);
                const productSlug = this.slugify(group.comparisonKey) ||
                    createHash("sha256").update(group.comparisonKey).digest("hex").slice(0, 24);
                const brand = await transaction.brand.upsert({
                    where: { slug: brandSlug },
                    create: { name: brandName, slug: brandSlug },
                    update: { name: brandName, deletedAt: null },
                });
                const category = await transaction.category.upsert({
                    where: { slug: categorySlug },
                    create: { name: categoryName, slug: categorySlug },
                    update: { name: categoryName, deletedAt: null },
                });
                const canonicalProduct = await transaction.product.upsert({
                    where: { slug: productSlug },
                    create: {
                        name: representative.title.trim(),
                        slug: productSlug,
                        thumbnailUrl: representative.imageUrl || null,
                        brandId: brand.id,
                        categoryId: category.id,
                    },
                    update: {
                        name: representative.title.trim(),
                        thumbnailUrl: representative.imageUrl || null,
                        brandId: brand.id,
                        categoryId: category.id,
                        isActive: true,
                        deletedAt: null,
                    },
                });
                for (const offer of group.offers) {
                    const externalOfferId = this.externalOfferId(offer);
                    const marketplace = offer.marketplace.trim() || "Marketplace";
                    const offerKey = `${this.normalizeText(marketplace)}|${externalOfferId}`;
                    if (seenOfferKeys.has(offerKey))
                        continue;
                    seenOfferKeys.add(offerKey);
                    const now = new Date();
                    const listing = await transaction.marketplaceListing.upsert({
                        where: {
                            marketplace_externalOfferId: {
                                marketplace,
                                externalOfferId,
                            },
                        },
                        create: {
                            marketplace,
                            externalOfferId,
                            externalProductId: offer.productId || null,
                            canonicalKey: group.comparisonKey,
                            productId: canonicalProduct.id,
                            title: offer.title.trim(),
                            normalizedTitle: this.normalizeText(offer.title),
                            brand: offer.brand?.trim() || null,
                            category: this.optionalText(offer, "category"),
                            productUrl: offer.productUrl || null,
                            imageUrl: offer.imageUrl || null,
                            firstSeenAt: now,
                            lastSeenAt: now,
                        },
                        update: {
                            externalProductId: offer.productId || null,
                            canonicalKey: group.comparisonKey,
                            productId: canonicalProduct.id,
                            title: offer.title.trim(),
                            normalizedTitle: this.normalizeText(offer.title),
                            brand: offer.brand?.trim() || null,
                            category: this.optionalText(offer, "category"),
                            productUrl: offer.productUrl || null,
                            imageUrl: offer.imageUrl || null,
                            lastSeenAt: now,
                        },
                    });
                    const stateHash = this.stateHash(offer);
                    const existingSnapshot = await transaction.offerSnapshot.findUnique({
                        where: {
                            listingId_stateHash: {
                                listingId: listing.id,
                                stateHash,
                            },
                        },
                        select: { id: true },
                    });
                    const snapshot = await transaction.offerSnapshot.upsert({
                        where: {
                            listingId_stateHash: {
                                listingId: listing.id,
                                stateHash,
                            },
                        },
                        create: {
                            listingId: listing.id,
                            stateHash,
                            price: offer.price,
                            originalPrice: offer.originalPrice,
                            currency: offer.currency || "NGN",
                            rating: offer.rating,
                            reviewCount: this.optionalNumber(offer, "reviewCount"),
                            inStock: offer.inStock,
                        },
                        update: {
                            lastObservedAt: now,
                            observationCount: { increment: 1 },
                        },
                    });
                    if (observedSnapshotIds.has(snapshot.id))
                        continue;
                    observedSnapshotIds.add(snapshot.id);
                    if (existingSnapshot) {
                        reusedSnapshots += 1;
                    }
                    else {
                        newSnapshots += 1;
                    }
                    const analysis = group.aiAnalysis;
                    const isBestOffer = Boolean(analysis &&
                        this.normalizeText(analysis.best_marketplace) ===
                            this.normalizeText(offer.marketplace) &&
                        Math.abs(analysis.best_price - offer.price) < 0.01);
                    await transaction.searchObservation.create({
                        data: {
                            searchId: search.id,
                            snapshotId: snapshot.id,
                            comparisonKey: group.comparisonKey,
                            groupPosition,
                            relevanceScore: analysis?.relevance_score,
                            confidenceScore: analysis?.confidence_score,
                            evaluationScore: analysis?.evaluation_score,
                            isBestOffer,
                        },
                    });
                    observations += 1;
                }
            }
            return {
                searchId: search.id,
                observations,
                newSnapshots,
                reusedSnapshots,
            };
        });
    }
    async getTrainingDataset(query) {
        const limit = Math.min(Math.max(query.limit ?? 250, 1), 1000);
        const observations = await prisma.searchObservation.findMany({
            take: limit + 1,
            ...(query.cursor
                ? {
                    cursor: { id: query.cursor },
                    skip: 1,
                }
                : {}),
            orderBy: [{ createdAt: "asc" }, { id: "asc" }],
            where: this.trainingDataWhere(query.query),
            include: {
                search: true,
                snapshot: {
                    include: {
                        listing: true,
                    },
                },
            },
        });
        const hasMore = observations.length > limit;
        const page = observations.slice(0, limit);
        return {
            version: "search-observations-v1",
            generatedAt: new Date().toISOString(),
            data: page.map((observation) => {
                const { listing } = observation.snapshot;
                return {
                    id: observation.id,
                    searchId: observation.searchId,
                    query: observation.search.query,
                    normalizedQuery: observation.search.normalizedQuery,
                    comparisonKey: observation.comparisonKey,
                    observedAt: observation.createdAt.toISOString(),
                    groupPosition: observation.groupPosition,
                    relevanceScore: observation.relevanceScore,
                    confidenceScore: observation.confidenceScore,
                    evaluationScore: observation.evaluationScore,
                    isBestOffer: observation.isBestOffer,
                    marketplace: listing.marketplace,
                    externalOfferId: listing.externalOfferId,
                    externalProductId: listing.externalProductId,
                    title: listing.title,
                    normalizedTitle: listing.normalizedTitle,
                    brand: listing.brand,
                    category: listing.category,
                    modelNumber: listing.modelNumber,
                    gtin: listing.gtin,
                    price: Number(observation.snapshot.price),
                    originalPrice: observation.snapshot.originalPrice === null
                        ? null
                        : Number(observation.snapshot.originalPrice),
                    currency: observation.snapshot.currency,
                    rating: observation.snapshot.rating,
                    reviewCount: observation.snapshot.reviewCount,
                    inStock: observation.snapshot.inStock,
                    productUrl: listing.productUrl,
                    imageUrl: listing.imageUrl,
                    firstObservedAt: observation.snapshot.firstObservedAt.toISOString(),
                    lastObservedAt: observation.snapshot.lastObservedAt.toISOString(),
                    observationCount: observation.snapshot.observationCount,
                    enrichmentSource: listing.enrichmentSource,
                    specifications: listing.specifications,
                };
            }),
            pagination: {
                limit,
                nextCursor: hasMore ? (page.at(-1)?.id ?? null) : null,
                hasMore,
            },
        };
    }
    async getAnalytics() {
        const [searches, observations, uniqueListings, priceSnapshots, topQueries, marketplaces,] = await Promise.all([
            prisma.marketplaceSearch.count(),
            prisma.searchObservation.count(),
            prisma.marketplaceListing.count(),
            prisma.offerSnapshot.count(),
            prisma.marketplaceSearch.groupBy({
                by: ["normalizedQuery"],
                _count: { _all: true },
                orderBy: { _count: { normalizedQuery: "desc" } },
                take: 10,
            }),
            prisma.marketplaceListing.groupBy({
                by: ["marketplace"],
                _count: { _all: true },
                orderBy: { _count: { marketplace: "desc" } },
            }),
        ]);
        return {
            generatedAt: new Date().toISOString(),
            searches,
            observations,
            uniqueListings,
            priceSnapshots,
            deduplicatedObservations: Math.max(observations - priceSnapshots, 0),
            topQueries: topQueries.map((entry) => ({
                query: entry.normalizedQuery,
                count: entry._count._all,
            })),
            marketplaces: marketplaces.map((entry) => ({
                marketplace: entry.marketplace,
                listingCount: entry._count._all,
            })),
        };
    }
    normalizeText(value) {
        return value.trim().toLowerCase().replace(/\s+/g, " ");
    }
    slugify(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 180);
    }
    trainingDataWhere(query) {
        if (!query?.trim()) {
            return undefined;
        }
        const normalizedQuery = this.normalizeText(query);
        const queryTokens = normalizedQuery
            .split(" ")
            .filter((token) => token.length >= 2);
        const matchingConditions = [
            {
                search: {
                    normalizedQuery,
                },
            },
        ];
        if (queryTokens.length > 0) {
            matchingConditions.push({
                AND: queryTokens.map((token) => ({
                    snapshot: {
                        listing: {
                            normalizedTitle: {
                                contains: token,
                            },
                        },
                    },
                })),
            });
        }
        return {
            OR: matchingConditions,
        };
    }
    externalOfferId(offer) {
        const id = offer.id?.trim();
        if (id) {
            return id;
        }
        return createHash("sha256")
            .update([offer.marketplace, offer.productId, offer.productUrl, offer.title]
            .map((part) => this.normalizeText(part ?? ""))
            .join("|"))
            .digest("hex");
    }
    stateHash(offer) {
        return createHash("sha256")
            .update(JSON.stringify({
            price: offer.price,
            originalPrice: offer.originalPrice ?? null,
            currency: offer.currency || "NGN",
            rating: offer.rating ?? null,
            reviewCount: this.optionalNumber(offer, "reviewCount"),
            inStock: offer.inStock,
        }))
            .digest("hex");
    }
    optionalText(offer, key) {
        const value = offer[key];
        return typeof value === "string" && value.trim() ? value.trim() : null;
    }
    optionalNumber(offer, key) {
        const value = offer[key];
        return typeof value === "number" && Number.isFinite(value) ? value : null;
    }
    parseDate(value) {
        if (!value) {
            return null;
        }
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }
}
//# sourceMappingURL=SearchDatasetService.js.map