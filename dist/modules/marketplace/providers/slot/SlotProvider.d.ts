/**
 * -----------------------------------------------------------------------------
 * File: SlotProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Slot.
 *
 * Responsibilities:
 * - Execute product searches against the Slot API.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import { MarketplaceProvider } from "../MarketplaceProvider.js";
import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";
export declare class SlotProvider implements MarketplaceProvider {
    readonly name = "Slot";
    private readonly client;
    constructor();
    /**
     * Builds Slot request headers.
     */
    private buildHeaders;
    /**
     * Searches products on Slot.
     */
    search(query: string): Promise<Offer[]>;
    /**
     * Retrieves a product by its marketplace identifier.
     *
     * Will be implemented in a later milestone.
     */
    getProduct(_productId: string): Promise<Product>;
}
