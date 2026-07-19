/**
 * -----------------------------------------------------------------------------
 * File: SlotProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Slot.
 *
 * Responsibilities:
 * - Execute product searches against the Slot API.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */

import axios, { AxiosError, AxiosInstance } from "axios";

import { MarketplaceProvider } from "../MarketplaceProvider.js";

import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";

import { SLOT_CONFIG } from "./config/slot.config.js";

import { SlotOfferMapper } from "./mappers/SlotOfferMapper.js";

import { SlotSearchRequestDto } from "./dto/SlotSearchRequestDto.js";
import { SlotSearchResponseDto } from "./dto/SlotSearchResponseDto.js";

export class SlotProvider implements MarketplaceProvider {
  public readonly name = "Slot";

  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: SLOT_CONFIG.BASE_URL,
      timeout: SLOT_CONFIG.HTTP.TIMEOUT,
      withCredentials: SLOT_CONFIG.HTTP.WITH_CREDENTIALS,
    });
  }

  /**
   * Builds Slot request headers.
   */
  private buildHeaders(visibility: string) {
    return {
      ...SLOT_CONFIG.HTTP.HEADERS,
      "X-Visibility": visibility,
    };
  }

  /**
   * Searches products on Slot.
   */
  async search(query: string): Promise<Offer[]> {
    const request: SlotSearchRequestDto = {
      q: query,
      page: SLOT_CONFIG.SEARCH.DEFAULT_PAGE,
      per_page: SLOT_CONFIG.SEARCH.DEFAULT_PAGE_SIZE,
    };

    try {
      const response = await this.client.get<SlotSearchResponseDto>(
        SLOT_CONFIG.SEARCH.ENDPOINT,
        {
          params: request,
          headers: this.buildHeaders(SLOT_CONFIG.VISIBILITY.SEARCH),
        },
      );

      return SlotOfferMapper.toOffers(response.data.data ?? []);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `Slot search failed (${error.response?.status ?? "Unknown"}): ${
            error.response?.data?.message ?? error.message
          }`,
        );
      }

      throw new Error(
        `Unexpected error while searching Slot: ${
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
