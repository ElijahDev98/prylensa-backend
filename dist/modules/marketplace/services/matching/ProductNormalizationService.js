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
export class ProductNormalizationService {
    /**
     * Normalizes product title and brand.
     */
    normalize(title, brand) {
        return {
            title: this.normalizeText(title),
            brand: this.normalizeText(brand ?? ""),
        };
    }
    /**
     * Creates a deterministic comparison key.
     */
    createComparisonKey(title, brand) {
        const normalized = this.normalize(title, brand);
        return `${normalized.brand}|${normalized.title}`;
    }
    /**
     * Performs deterministic text normalization.
     */
    normalizeText(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/[_/\\-]+/g, " ")
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, " ");
    }
}
//# sourceMappingURL=ProductNormalizationService.js.map