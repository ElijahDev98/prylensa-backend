/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Defines the contract that every marketplace provider must implement.
 *
 * The application communicates with marketplace providers through this
 * interface rather than concrete implementations. This ensures loose coupling
 * and allows providers to be added, replaced, or tested independently.
 *
 * Responsibilities:
 * - Standardize marketplace operations.
 * - Hide implementation details of external APIs.
 * - Enable interchangeable marketplace providers.
 * -----------------------------------------------------------------------------
 */
import { Offer } from "../models/Offer.js";
import { Product } from "../models/Product.js";
/**
 * Defines the required functionality for every marketplace provider.
 */
export interface MarketplaceProvider {
    /**
     * Human-readable marketplace name.
     * Example: "Konga", "Jumia"
     */
    readonly name: string;
    /**
     * Searches the marketplace for products.
     *
     * @param query User search keyword.
     * @returns A collection of marketplace offers.
     */
    search(query: string): Promise<Offer[]>;
    /**
     * Retrieves detailed information for a product.
     *
     * @param productId Marketplace product identifier.
     * @returns Complete product information.
     */
    getProduct(productId: string): Promise<Product>;
}
