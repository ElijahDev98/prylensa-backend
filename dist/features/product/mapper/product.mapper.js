/**
 * -----------------------------------------------------------------------------
 * File: product.mapper.ts
 * Project: Prylensa Backend
 * Feature: Product
 *
 * Purpose:
 * Maps Product Prisma entities, domain models, and response DTOs.
 * -----------------------------------------------------------------------------
 */
export class ProductMapper {
    /**
     * Prisma → Domain Model
     */
    static fromPrisma(product) {
        const prices = product.offers.map((offer) => offer.currentPrice.toNumber());
        const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;
        const highestPrice = prices.length > 0 ? Math.max(...prices) : null;
        const averagePrice = prices.length > 0
            ? prices.reduce((sum, value) => sum + value, 0) / prices.length
            : null;
        const primaryImage = product.images.find((image) => image.isPrimary);
        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            sku: product.sku,
            modelNumber: product.modelNumber,
            description: product.description,
            thumbnail: primaryImage?.url ?? product.thumbnailUrl ?? null,
            isActive: product.isActive,
            brand: {
                id: product.brand.id,
                name: product.brand.name,
            },
            category: {
                id: product.category.id,
                name: product.category.name,
            },
            images: product.images.map((image) => ({
                id: image.id,
                imageUrl: image.url,
                altText: image.altText,
                isPrimary: image.isPrimary,
                sortOrder: image.sortOrder,
            })),
            pricing: {
                lowestPrice,
                highestPrice,
                averagePrice,
                offersCount: prices.length,
            },
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    /**
     * Domain Model → Response DTO
     */
    static toResponse(product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
            brand: product.brand,
            category: product.category,
            images: product.images,
            pricing: product.pricing,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
    /**
     * Prisma[] → Domain Models
     */
    static fromPrismaList(products) {
        return products.map(ProductMapper.fromPrisma);
    }
    /**
     * Domain Models → Response DTOs
     */
    static toResponseList(products) {
        return products.map(ProductMapper.toResponse);
    }
}
//# sourceMappingURL=product.mapper.js.map