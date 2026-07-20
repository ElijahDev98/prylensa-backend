/**
 * -----------------------------------------------------------------------------
 * Jumia Product DTO
 * -----------------------------------------------------------------------------
 *
 * Represents a single product extracted from Jumia's embedded search data.
 *
 * This DTO mirrors the provider contract and intentionally remains independent
 * of the application's business models.
 *
 * Any normalization is performed exclusively by the JumiaOfferMapper.
 * -----------------------------------------------------------------------------
 */

import { JumiaPriceDto } from "./jumia-price.dto.js";
import { JumiaRatingDto } from "./jumia-rating.dto.js";

export interface JumiaProductDto {
  /**
   * Marketplace product identifier.
   */
  sku: string;

  /**
   * Product title.
   */
  name: string;

  /**
   * Optional display name.
   */
  displayName?: string;

  /**
   * Product brand.
   */
  brand: string;

  /**
   * Seller identifier.
   */
  sellerId?: number;

  /**
   * Indicates whether Express Shipping is available.
   */
  isShopExpress?: boolean;

  /**
   * Marketplace category hierarchy.
   */
  categories: string[];

  /**
   * Product pricing.
   */
  prices: JumiaPriceDto;

  /**
   * Product rating.
   */
  rating?: JumiaRatingDto;

  /**
   * Product image URL.
   */
  image: string;

  /**
   * Alternative image description.
   */
  imageAlt?: string;

  /**
   * Relative product URL.
   */
  url: string;

  /**
   * Marketplace tags.
   */
  tags?: string;

  /**
   * Sponsored listing indicator.
   */
  isSponsored?: boolean;

  /**
   * Purchase availability.
   */
  isBuyable: boolean;

  /**
   * Provider modification timestamp.
   */
  lastModified?: number;
}
