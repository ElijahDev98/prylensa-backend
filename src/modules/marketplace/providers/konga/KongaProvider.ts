/**
 * -----------------------------------------------------------------------------
 * File: KongaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Konga.
 *
 * Responsibilities:
 * - Communicate with the Konga Search API.
 * - Execute product searches.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */

import axios, { AxiosError, AxiosInstance } from "axios";

import { MarketplaceProvider } from "../MarketplaceProvider.js";

import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";

import { KONGA_CONFIG } from "./config/konga.config.js";

import { KongaOfferMapper } from "./mappers/KongaOfferMapper.js";

import { KongaSearchRequestDto } from "./dto/KongaSearchRequestDto.js";
import { KongaSearchResponseDto } from "./dto/KongaSearchResponseDto.js";

export class KongaProvider implements MarketplaceProvider {
  /**
   * Marketplace display name.
   */
  public readonly name = "Konga";

  /**
   * HTTP client.
   */
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: KONGA_CONFIG.BASE_URL,
      timeout: KONGA_CONFIG.REQUEST_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        "kss-api-key": KONGA_CONFIG.API_KEY,
      },
    });
  }

  /**
   * Searches products on Konga.
   */
  async search(query: string): Promise<Offer[]> {
    const request: KongaSearchRequestDto = {
      name: KONGA_CONFIG.SEARCH_INDEX,
      q: query,
      page: KONGA_CONFIG.DEFAULT_PAGE,
      hitPerPage: KONGA_CONFIG.DEFAULT_PAGE_SIZE,
      facet_by: KONGA_CONFIG.DEFAULT_FACET,
    };

    try {
      const response = await this.client.post<KongaSearchResponseDto>(
        KONGA_CONFIG.SEARCH_ENDPOINT,
        request,
      );

      const products = response.data.data.hits ?? [];

      return KongaOfferMapper.toOffers(products);
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? "Unknown";
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ??
          error.message;

        throw new Error(`Konga search failed (${status}): ${message}`);
      }

      throw new Error(
        `Unexpected error while searching Konga: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Retrieves a product by its marketplace identifier.
   *
   * Will be implemented in a later milestone.
   */
  async getProduct(_productId: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
