/**
 * -----------------------------------------------------------------------------
 * File: KongaSearchResponseDto.ts
 * Module: Marketplace
 *
 * Description:
 * Defines the response contract returned by Konga's Search API.
 *
 * IMPORTANT:
 * This DTO mirrors the external API response and should never leave the
 * provider layer. It must be mapped into domain models before use.
 * -----------------------------------------------------------------------------
 */

/**
 * Root search response.
 */
export interface KongaSearchResponseDto {
  found: number;
  hits: KongaSearchHitDto[];
}

/**
 * Represents a single product returned by the search API.
 */
export interface KongaSearchHitDto {
  document: KongaProductDocumentDto;
}

/**
 * Product document returned by Konga.
 */
export interface KongaProductDocumentDto {
  id: string;

  title: string;

  image?: string;

  price: number;

  original_price?: number;

  currency?: string;

  url?: string;

  in_stock?: boolean;

  attributes?: {
    brand?: string;
  };
}
