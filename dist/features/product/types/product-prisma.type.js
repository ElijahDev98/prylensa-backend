/**
 * -----------------------------------------------------------------------------
 * File: product-prisma.type.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Centralizes Prisma payload types used by the Product feature.
 * -----------------------------------------------------------------------------
 */
export const PRODUCT_INCLUDE = {
    brand: true,
    category: true,
    images: {
        orderBy: {
            sortOrder: "asc",
        },
    },
    offers: true,
};
//# sourceMappingURL=product-prisma.type.js.map