/**
 * -----------------------------------------------------------------------------
 * File: KongaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Konga.
 *
 * Responsibilities:
 * - Communicate with Konga's external APIs.
 * - Retrieve search results.
 * - Retrieve product details.
 * - Convert external responses into domain models.
 *
 * NOTE:
 * This class should never expose Konga-specific DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */

import axios, { AxiosInstance } from "axios";

import { MarketplaceProvider } from "../MarketplaceProvider.js";
import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";

export class KongaProvider implements MarketplaceProvider {
  /**
   * Marketplace display name.
   */
  public readonly name = "Konga";

  /**
   * HTTP client used for communicating with Konga Search API.
   */
  private readonly client: AxiosInstance;

  /**
   * Creates a new Konga provider.
   */
  constructor() {
    this.client = axios.create({
      baseURL: "https://kss.igbimo.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Searches Konga products.
   *
   * TODO:
   * Implement in the next milestone.
   */
  async search(_query: string): Promise<Offer[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * Retrieves detailed product information.
   *
   * TODO:
   * Implement in a later milestone.
   */
  async getProduct(_productId: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
