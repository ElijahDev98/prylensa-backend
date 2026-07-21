import { Offer } from "../../../models/Offer.js";
import { SlotProductDto } from "../dto/SlotSearchResponseDto.js";
/**
 * Maps Slot API products into the application's
 * shared Offer domain model.
 */
export declare class SlotOfferMapper {
    /**
     * Converts a collection of Slot products into
     * Offer domain models.
     *
     * @param products Products returned by the Slot API.
     * @returns Array of Offer domain models.
     */
    static toOffers(products: SlotProductDto[]): Offer[];
    /**
     * Converts a single Slot product into
     * an Offer domain model.
     *
     * @param product Slot product.
     * @returns Offer domain model.
     */
    /**
     * Converts a single Slot product into
     * an Offer domain model.
     *
     * @param product Slot product.
     * @returns Offer domain model.
     */
    static toOffer(product: SlotProductDto): Offer;
}
