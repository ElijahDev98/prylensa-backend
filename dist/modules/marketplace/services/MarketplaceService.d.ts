/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceService.ts
 * Module: Marketplace
 *
 * Description:
 * Encapsulates marketplace business logic.
 *
 * Responsibilities:
 * - Validate incoming search requests.
 * - Retrieve marketplace offers from the repository.
 * - Coordinate business operations.
 * -----------------------------------------------------------------------------
 */
import { Offer } from "../models/Offer.js";
import { MarketplaceRepository } from "../repositories/MarketplaceRepository.js";
export declare class MarketplaceService {
    private readonly repository;
    /**
     * Creates a marketplace service.
     */
    constructor(repository: MarketplaceRepository);
    /**
     * Searches all configured marketplaces.
     *
     * @param query User search keyword.
     * @returns Marketplace offers.
     */
    search(query: string): Promise<Offer[]>;
}
