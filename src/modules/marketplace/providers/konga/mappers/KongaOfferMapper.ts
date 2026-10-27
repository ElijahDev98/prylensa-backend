/**
 * -----------------------------------------------------------------------------
 * File: KongaOfferMapper.ts
 * Module: Marketplace / Konga Provider
 *
 * Description:
 * Maps Konga provider DTOs into the application's Offer domain model.
 *
 * Responsibilities:
 * - Isolate the Konga API contract.
 * - Convert provider-specific fields into Offer.
 * - Contain no networking or business logic.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../../../models/Offer.js";
import type { KongaSearchItemDto } from "../dto/KongaSearchResponseDto.js";

const KONGA_BASE_URL = "https://www.konga.com/product/";
const KONGA_IMAGE_BASE_URL =
  "https://www-konga-com-res.cloudinary.com/image/upload/f_auto,q_auto,w_400,c_limit/media/catalog/product";

export class KongaOfferMapper {
  /**
   * Maps a single Konga search result into an Offer.
   */
  static toOffer(product: KongaSearchItemDto): Offer {
    const hasDiscount =
      product.special_price !== null &&
      product.special_price !== undefined &&
      product.special_price > 0 &&
      product.special_price < product.price;
    const discountedPrice = hasDiscount
      ? product.special_price!
      : product.price;
    const discountPercentage = hasDiscount
      ? ((product.price - discountedPrice) / product.price) * 100
      : undefined;

    return {
      id: product.objectid,

      productId: product.objectid,

      title: product.name,

      brand: product.brand,

      price: discountedPrice,

      originalPrice: hasDiscount ? product.price : undefined,

      discountPercentage,

      currency: "NGN",

      imageUrl: product.image_thumbnail_path
        ? `${KONGA_IMAGE_BASE_URL}${product.image_thumbnail_path}`
        : "",

      productUrl: product.url_key ? `${KONGA_BASE_URL}${product.url_key}` : "",

      marketplace: "Konga",

      inStock: product.stock?.in_stock === 1,

      rating: product.rating?.average_rating,
    };
  }

  /**
   * Maps multiple Konga search results.
   */
  static toOffers(products: KongaSearchItemDto[]): Offer[] {
    return products.map((product) => this.toOffer(product));
  }
}
