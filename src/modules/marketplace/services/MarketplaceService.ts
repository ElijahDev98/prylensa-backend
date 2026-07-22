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
 * - Execute the offer matching pipeline.
 * - Coordinate marketplace business operations.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../models/Offer.js";

import { MarketplaceRepository } from "../repositories/MarketplaceRepository.js";
import { OfferMatchingEngine } from "./matching/OfferMatchingEngine.js";
import type { OfferGroup } from "./matching/DeterministicMatcher.js";

export class MarketplaceService {
  /**
   * Creates a marketplace service.
   */
  constructor(
    private readonly repository: MarketplaceRepository,
    private readonly matchingEngine = new OfferMatchingEngine(),
  ) {}

  /**
   * Searches all configured marketplaces.
   *
   * Workflow:
   *
   * 1. Validate the search query.
   * 2. Retrieve marketplace offers.
   * 3. Execute the matching pipeline.
   * 4. Return grouped marketplace offers.
   *
   * @param query User search keyword.
   *
   * @returns Matched marketplace offer groups.
   */
  public async search(query: string): Promise<readonly OfferGroup[]> {
    /**
     * Remove leading and trailing whitespace.
     */
    const keyword = query.trim();

    /**
     * Prevent empty search requests.
     */
    if (!keyword) {
      throw new Error("Search query cannot be empty.");
    }

    /**
     * Retrieve marketplace offers from every configured provider.
     */
    const offers: Offer[] = await this.repository.search(keyword);

    /**
     * Execute the marketplace matching pipeline.
     *
     * Current stages:
     * 1. Deterministic Matching
     * 2. AI Semantic Matching (Placeholder)
     */
    return this.matchingEngine.match(offers);
  }
}
