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
import { OfferFreshnessReconciler } from "../services/matching/OfferFreshnessReconciler.js";
export declare class MarketplaceRepository {
    private readonly providers;
    private readonly freshnessReconciler;
    private readonly completedByQuery;
    private readonly refreshes;
    constructor(providers: readonly MarketplaceProvider[], freshnessReconciler?: OfferFreshnessReconciler);
    /**
     * Searches every registered marketplace.
     *
     * @param query User search keyword.
     * @returns Aggregated marketplace offers.
     */
    search(query: string): Promise<Offer[]>;
    private getPersistedOffers;
    private ensureRefresh;
    /**
     * Executes a marketplace provider and records execution metrics.
     */
    private executeProvider;
}
