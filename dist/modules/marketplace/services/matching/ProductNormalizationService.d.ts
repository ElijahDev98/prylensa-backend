/**
 * -----------------------------------------------------------------------------
 * File: ProductNormalizationService.ts
 * Module: Marketplace
 *
 * Description:
 * Provides deterministic normalization for marketplace product data before
 * product matching is performed.
 *
 * This service removes formatting differences that commonly occur across
 * marketplace providers while intentionally avoiding AI or fuzzy matching.
 *
 * Responsibilities:
 * - Normalize product titles.
 * - Normalize product brands.
 * - Produce deterministic comparison keys.
 *
 * Responsibilities NOT included:
 * - Product matching
 * - AI semantic matching
 * - Similarity scoring
 * - Offer grouping
 * -----------------------------------------------------------------------------
 */
export interface NormalizedProduct {
    title: string;
    brand: string;
}
export declare class ProductNormalizationService {
    /**
     * Normalizes product title and brand.
     */
    normalize(title: string, brand?: string): NormalizedProduct;
    /**
     * Creates a deterministic comparison key.
     */
    createComparisonKey(title: string, brand?: string): string;
    /**
     * Performs deterministic text normalization.
     */
    private normalizeText;
}
