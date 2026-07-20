/**
 * -----------------------------------------------------------------------------
 * Jumia Offer Mapper
 * -----------------------------------------------------------------------------
 *
 * Converts Jumia provider DTOs into the application's Offer domain model.
 *
 * Responsibilities:
 * - Translate provider-specific fields
 * - Normalize provider data
 * - Keep provider implementation isolated from the domain layer
 *
 * This class contains no networking or HTML parsing logic.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../../../models/Offer.js";
import type { JumiaProductDto } from "../dto/jumia-product.dto.js";

export class JumiaOfferMapper {
  /**
   * Maps a Jumia product into the Offer domain model.
   */
  public map(product: JumiaProductDto): Offer {
    return {
      id: product.sku,

      productId: product.sku,

      title: product.name,

      brand: product.brand || undefined,

      price: Number(product.prices.rawPrice),

      originalPrice: product.prices.oldPrice
        ? Number(product.prices.oldPrice.replace(/[^\d.]/g, ""))
        : undefined,

      currency: "NGN",

      imageUrl: product.image,

      productUrl: this.buildProductUrl(product.url),

      marketplace: "Jumia",

      inStock: product.isBuyable,

      rating: product.rating?.average,
    };
  }

  /**
   * Maps multiple products.
   */
  public mapMany(products: JumiaProductDto[]): Offer[] {
    return products.map((product) => this.map(product));
  }

  /**
   * Converts a relative Jumia URL into an absolute URL.
   */
  private buildProductUrl(url: string): string {
    if (url.startsWith("http")) {
      return url;
    }

    return `https://www.jumia.com.ng${url}`;
  }
}
