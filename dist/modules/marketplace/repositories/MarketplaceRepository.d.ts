/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceRepository.ts
 * Module: Marketplace
 *
 * Description:
 * Coordinates marketplace providers and exposes a unified interface for
 * retrieving marketplace offers.
 *
 * Responsibilities:
 * - Execute searches across registered marketplace providers.
 * - Aggregate offers into a single collection.
 * - Isolate higher layers from provider implementations.
 * - Continue searching even if one provider fails.
 * -----------------------------------------------------------------------------
 */
import { Offer } from "../models/Offer.js";
import { MarketplaceProvider } from "../providers/MarketplaceProvider.js";
export declare class MarketplaceRepository {
    private readonly providers;
    /**
     * Registered marketplace providers.
     */
    constructor(providers: MarketplaceProvider[]);
    /**
     * Searches every registered marketplace.
     *
     * @param query User search keyword.
     * @returns Aggregated marketplace offers.
     */
    search(query: string): Promise<Offer[]>;
}
