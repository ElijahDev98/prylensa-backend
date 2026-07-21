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
export declare class JumiaOfferMapper {
    /**
     * Maps a Jumia product into the Offer domain model.
     */
    map(product: JumiaProductDto): Offer;
    /**
     * Maps multiple products.
     */
    mapMany(products: JumiaProductDto[]): Offer[];
    /**
     * Converts a relative Jumia URL into an absolute URL.
     */
    private buildProductUrl;
}
