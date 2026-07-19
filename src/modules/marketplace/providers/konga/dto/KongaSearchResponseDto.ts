/**
 * -----------------------------------------------------------------------------
 * File: KongaSearchResponseDto.ts
 * Module: Marketplace / Konga
 *
 * Description:
 * Represents the response returned by the Konga Search API.
 *
 * This DTO mirrors the external API contract and must remain isolated within
 * the Konga provider. It should never be exposed outside the provider layer.
 *
 * Responsibilities:
 * - Model the Konga search response.
 * - Preserve the external API schema.
 * - Serve as the input for KongaOfferMapper.
 * -----------------------------------------------------------------------------
 */

/**
 * Root response returned by the Konga Search API.
 */
export interface KongaSearchResponseDto {
  /**
   * Search results.
   */
  data: KongaSearchItemDto[];

  /**
   * Total number of matching products.
   */
  total?: number;

  /**
   * Current page number.
   */
  page?: number;

  /**
   * Number of results returned.
   */
  hitPerPage?: number;
}

/**
 * Represents a single Konga search result.
 */
export interface KongaSearchItemDto {
  /**
   * Marketplace product identifier.
   */
  id: string;

  /**
   * Product title.
   */
  name: string;

  /**
   * Product brand.
   */
  brand?: string;

  /**
   * Current selling price.
   */
  price: number;

  /**
   * Original price before discount.
   */
  originalPrice?: number;

  /**
   * Currency code.
   */
  currency?: string;

  /**
   * Primary product image.
   */
  image?: string;

  /**
   * Product URL.
   */
  url?: string;

  /**
   * Product availability.
   */
  inStock?: boolean;

  /**
   * Average customer rating.
   */
  rating?: number;
}
