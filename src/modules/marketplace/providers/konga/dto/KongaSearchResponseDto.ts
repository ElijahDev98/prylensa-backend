/**
 * -----------------------------------------------------------------------------
 * File: KongaSearchResponseDto.ts
 * Module: Marketplace / Konga Provider
 *
 * Description:
 * Models the response returned by the Konga Search API.
 *
 * IMPORTANT:
 * This DTO mirrors the provider's response as closely as possible. It should
 * never be exposed outside the provider layer. All conversions into the
 * application's domain models must be performed by KongaOfferMapper.
 * -----------------------------------------------------------------------------
 */

/**
 * Root response returned by the Konga Search API.
 */
export interface KongaSearchResponseDto {
  status?: string;
  message?: string;
  data: KongaSearchDataDto;
}

/**
 * Search result container.
 */
export interface KongaSearchDataDto {
  query_string?: string;
  total?: number;
  page?: number;
  hitsPerPage?: number;

  /**
   * Products returned by the search.
   */
  hits: KongaSearchItemDto[];
}

/**
 * Represents a single product returned by Konga.
 */
export interface KongaSearchItemDto {
  /**
   * Marketplace identifier.
   */
  objectid: string;

  /**
   * Marketplace SKU.
   */
  sku?: string;

  /**
   * Product title.
   */
  name: string;

  /**
   * Brand.
   */
  brand?: string;

  /**
   * Selling price.
   */
  price: number;

  /**
   * Discounted price.
   */
  special_price?: number | null;

  /**
   * Product URL slug.
   */
  url_key?: string;

  /**
   * Thumbnail path returned by Konga.
   */
  image_thumbnail_path?: string;

  /**
   * Product type.
   */
  product_type?: string;

  /**
   * Product description.
   */
  description?: {
    result?: string;
  };

  /**
   * Seller information.
   */
  seller?: KongaSellerDto;

  /**
   * Stock information.
   */
  stock?: KongaStockDto;

  /**
   * Customer ratings.
   */
  rating?: KongaRatingDto;

  /**
   * Product specifications.
   */
  attributes?: KongaAttributesDto;

  /**
   * Primary category.
   */
  category?: string;

  /**
   * Category hierarchy.
   */
  categories?: Record<string, string>;
}

/**
 * Seller information.
 */
export interface KongaSellerDto {
  id?: number;
  name?: string;
  city?: string;
  state?: string;
  logo?: string;
  is_konga?: number;
}

/**
 * Stock information.
 */
export interface KongaStockDto {
  in_stock?: number;
  quantity?: number;
  quantity_sold?: number;
  min_sale_qty?: number;
  max_sale_qty?: number;
}

/**
 * Rating information.
 */
export interface KongaRatingDto {
  average_rating?: number;
  total_rating?: number;
}

/**
 * Product attributes.
 *
 * The available keys vary by category, so we allow arbitrary string keys.
 */
export interface KongaAttributesDto {
  [key: string]: string[] | undefined;
}
