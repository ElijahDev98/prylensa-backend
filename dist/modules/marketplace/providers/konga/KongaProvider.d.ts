/**
 * -----------------------------------------------------------------------------
 * File: KongaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Konga.
 *
 * Responsibilities:
 * - Communicate with the Konga Search API.
 * - Execute product searches.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import { MarketplaceProvider } from "../MarketplaceProvider.js";
import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";
export declare class KongaProvider implements MarketplaceProvider {
    /**
     * Marketplace display name.
     */
    readonly name = "Konga";
    /**
     * HTTP client.
     */
    private readonly client;
    constructor();
    /**
     * Searches products on Konga.
     */
    search(query: string): Promise<Offer[]>;
    /**
     * Retrieves a product by its marketplace identifier.
     *
     * Will be implemented in a later milestone.
     */
    getProduct(_productId: string): Promise<Product>;
}
