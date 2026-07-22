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
 * - Validate search requests.
 * - Execute marketplace providers concurrently.
 * - Aggregate marketplace offers.
 * - Continue searching when individual providers fail.
 * - Record provider execution diagnostics.
 *
 * Responsibilities NOT included:
 * - Product matching
 * - Price comparison
 * - AI recommendation
 * - Business rules
 * -----------------------------------------------------------------------------
 */
import { Offer } from "../models/Offer.js";
import { MarketplaceProvider } from "../providers/MarketplaceProvider.js";
export declare class MarketplaceRepository {
    private readonly providers;
    constructor(providers: readonly MarketplaceProvider[]);
    /**
     * Searches every registered marketplace.
     *
     * @param query User search keyword.
     * @returns Aggregated marketplace offers.
     */
    search(query: string): Promise<Offer[]>;
    /**
     * Executes a marketplace provider and records execution metrics.
     */
    private executeProvider;
}
