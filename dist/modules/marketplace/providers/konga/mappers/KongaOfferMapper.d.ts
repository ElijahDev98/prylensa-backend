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
export declare class KongaOfferMapper {
    /**
     * Maps a single Konga search result into an Offer.
     */
    static toOffer(product: KongaSearchItemDto): Offer;
    /**
     * Maps multiple Konga search results.
     */
    static toOffers(products: KongaSearchItemDto[]): Offer[];
}
