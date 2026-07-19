/**
 * -----------------------------------------------------------------------------
 * File: SlotProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Slot.
 *
 * Responsibilities:
 * - Communicate with the Slot Product API.
 * - Execute product searches.
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
  /**
   * Marketplace display name.
   */
  public readonly name = "Slot";

  /**
   * HTTP client.
   */
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: SLOT_CONFIG.BASE_URL,
      timeout: SLOT_CONFIG.REQUEST_TIMEOUT,
      headers: {
        Accept: "application/json",
      },
    });
  }

  /**
   * Searches products on Slot.
   */
  async search(query: string): Promise<Offer[]> {
    const request: SlotSearchRequestDto = {
      q: query,
      page: SLOT_CONFIG.DEFAULT_PAGE,
      per_page: SLOT_CONFIG.DEFAULT_PAGE_SIZE,
    };

    try {
      const response = await this.client.get<SlotSearchResponseDto>(
        SLOT_CONFIG.SEARCH_ENDPOINT,
        {
          params: request,
        },
      );

      const products = response.data.data ?? [];

      return SlotOfferMapper.toOffers(products);
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? "Unknown";
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ??
          error.message;

        throw new Error(`Slot search failed (${status}): ${message}`);
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
