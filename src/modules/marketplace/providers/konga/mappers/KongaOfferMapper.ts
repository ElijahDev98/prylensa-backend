/**
 * -----------------------------------------------------------------------------
 * File: KongaOfferMapper.ts
 * Module: Marketplace / Konga
 *
 * Description:
 * Maps Konga Search API DTOs into the application's Offer domain model.
 *
 * Responsibilities:
 * - Convert Konga-specific DTOs into Offer objects.
 * - Keep external API contracts isolated from the domain layer.
 * - Ensure the rest of the application remains marketplace-agnostic.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../../../models/Offer.js";
import type { KongaSearchItemDto } from "../dto/KongaSearchResponseDto.js";

/**
 * Maps Konga search results into domain offers.
 */
export class KongaOfferMapper {
  /**
   * Converts a single Konga search item into an Offer.
   *
   * @param item Konga search result.
   * @returns Domain offer.
   */
  public static toOffer(item: KongaSearchItemDto): Offer {
    return {
      id: item.id,

      productId: item.id,

      title: item.name,

      brand: item.brand,

      price: item.price,

      originalPrice: item.originalPrice,

      currency: item.currency ?? "NGN",

      imageUrl: item.image ?? "",

      productUrl: item.url ?? "",

      marketplace: "Konga",

      inStock: item.inStock ?? true,

      rating: item.rating,
    };
  }

  /**
   * Converts multiple Konga search items into domain offers.
   *
   * @param items Collection of Konga search results.
   * @returns Collection of domain offers.
   */
  public static toOffers(items: readonly KongaSearchItemDto[]): Offer[] {
    return items.map(KongaOfferMapper.toOffer);
  }
}
