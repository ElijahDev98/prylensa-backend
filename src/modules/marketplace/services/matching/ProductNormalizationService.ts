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

export class ProductNormalizationService {
  /**
   * Normalizes product title and brand.
   */
  public normalize(title: string, brand?: string): NormalizedProduct {
    return {
      title: this.normalizeText(title),
      brand: this.normalizeText(brand ?? ""),
    };
  }

  /**
   * Creates a deterministic comparison key.
   */
  public createComparisonKey(title: string, brand?: string): string {
    const normalized = this.normalize(title, brand);

    return `${normalized.brand}|${normalized.title}`;
  }

  /**
   * Performs deterministic text normalization.
   */
  private normalizeText(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[_/\\-]+/g, " ")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ");
  }
}
