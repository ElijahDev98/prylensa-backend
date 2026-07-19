/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceRepository.ts
 * Module: Marketplace
 *
 * Description:
 * Coordinates marketplace providers and exposes a unified data access layer
 * for marketplace operations.
 *
 * Responsibilities:
 * - Delegate requests to marketplace providers.
 * - Hide provider implementations from the service layer.
 * - Support multiple marketplace providers in the future.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../models/Offer.js";
import type { Product } from "../models/Product.js";
import type { MarketplaceProvider } from "../providers/MarketplaceProvider.js";

import { KongaProvider } from "../providers/konga/KongaProvider.js";

export class MarketplaceRepository {
  /**
   * Registered marketplace providers.
   */
  private readonly providers: MarketplaceProvider[];

  constructor() {
    this.providers = [new KongaProvider()];
  }

  /**
   * Searches all registered marketplaces.
   *
   * @param query Search keyword.
   * @returns Combined marketplace offers.
   */
  async search(query: string): Promise<Offer[]> {
    const results = await Promise.all(
      this.providers.map((provider) => provider.search(query)),
    );

    return results.flat();
  }

  /**
   * Retrieves product details from a specific provider.
   *
   * @param providerName Marketplace name.
   * @param productId Product identifier.
   * @returns Product details.
   */
  async getProduct(providerName: string, productId: string): Promise<Product> {
    const provider = this.providers.find(
      (provider) => provider.name.toLowerCase() === providerName.toLowerCase(),
    );

    if (!provider) {
      throw new Error(`Marketplace '${providerName}' is not registered.`);
    }

    return provider.getProduct(productId);
  }
}
