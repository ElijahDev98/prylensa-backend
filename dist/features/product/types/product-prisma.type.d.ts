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
import type { Prisma } from "@prisma/client";
export declare const PRODUCT_INCLUDE: {
    brand: true;
    category: true;
    images: {
        orderBy: {
            sortOrder: "asc";
        };
    };
    offers: true;
};
export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: typeof PRODUCT_INCLUDE;
}>;
