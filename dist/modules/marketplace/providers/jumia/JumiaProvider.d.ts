/**
 * -----------------------------------------------------------------------------
 * File: JumiaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Jumia.
 *
 * Responsibilities:
 * - Execute product searches against Jumia.
 * - Download the fully rendered HTML using Playwright.
 * - Parse the marketplace application state.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import { MarketplaceProvider } from "../MarketplaceProvider.js";
import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";
export declare class JumiaProvider implements MarketplaceProvider {
    readonly name = "Jumia";
    private readonly scraper;
    private readonly parser;
    private readonly mapper;
    constructor();
    /**
     * Searches products on Jumia.
     */
    search(query: string): Promise<Offer[]>;
    /**
     * Retrieves a product by its marketplace identifier.
     *
     * Will be implemented in a later milestone.
     */
    getProduct(_productId: string): Promise<Product>;
}
