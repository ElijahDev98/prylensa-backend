/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceService.ts
 * Module: Marketplace
 *
 * Description:
 * Provides business logic for marketplace operations.
 *
 * Responsibilities:
 * - Validate business requests.
 * - Coordinate repository operations.
 * - Remain independent of provider implementations.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../models/Offer.js";
import type { Product } from "../models/Product.js";

import { MarketplaceRepository } from "../repositories/MarketplaceRepository.js";

export class MarketplaceService {
  /**
   * Marketplace repository.
   */
  private readonly repository: MarketplaceRepository;

  constructor(repository?: MarketplaceRepository) {
    this.repository = repository ?? new MarketplaceRepository();
  }

  /**
   * Searches all configured marketplaces.
   *
   * @param query Product search keyword.
   * @returns Marketplace offers.
   */
  async search(query: string): Promise<Offer[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      throw new Error("Search query cannot be empty.");
    }

    return this.repository.search(normalizedQuery);
  }

  /**
   * Retrieves detailed product information.
   *
   * @param marketplace Marketplace name.
   * @param productId Marketplace product identifier.
   * @returns Product details.
   */
  async getProduct(marketplace: string, productId: string): Promise<Product> {
    if (!marketplace.trim()) {
      throw new Error("Marketplace is required.");
    }

    if (!productId.trim()) {
      throw new Error("Product ID is required.");
    }

    return this.repository.getProduct(marketplace, productId);
  }
}
