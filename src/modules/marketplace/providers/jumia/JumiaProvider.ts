/**
 * -----------------------------------------------------------------------------
 * File: JumiaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Jumia.
 *
 * Responsibilities:
 * - Execute product searches against Jumia.
 * - Parse Jumia's HTML fragment.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */

import axios, { AxiosError, AxiosInstance } from "axios";

import { MarketplaceProvider } from "../MarketplaceProvider.js";

import { Offer } from "../../models/Offer.js";
import { Product } from "../../models/Product.js";

import { JUMIA_CONFIG } from "./config/jumia.config.js";

import { JumiaSearchParser } from "./parser/jumia-search.parser.js";
import { JumiaOfferMapper } from "./mapper/jumia-offer.mapper.js";

export class JumiaProvider implements MarketplaceProvider {
  public readonly name = "Jumia";

  private readonly client: AxiosInstance;

  private readonly parser: JumiaSearchParser;

  private readonly mapper: JumiaOfferMapper;

  constructor() {
    this.client = axios.create({
      baseURL: JUMIA_CONFIG.BASE_URL,
      timeout: JUMIA_CONFIG.HTTP.TIMEOUT,
      withCredentials: false,
      headers: JUMIA_CONFIG.HTTP.HEADERS,
    });

    this.parser = new JumiaSearchParser();
    this.mapper = new JumiaOfferMapper();
  }

  /**
   * Searches products on Jumia.
   */
  async search(query: string): Promise<Offer[]> {
    try {
      const response = await this.client.get<string>(
        JUMIA_CONFIG.SEARCH.ENDPOINT,
        {
          params: {
            query,
            page: JUMIA_CONFIG.SEARCH.DEFAULT_PAGE,
            numberItems: JUMIA_CONFIG.SEARCH.DEFAULT_PAGE_SIZE,
            viewType: JUMIA_CONFIG.SEARCH.DEFAULT_VIEW,
            returnOverride: `/catalog/?q=${encodeURIComponent(query)}`,
            lang: JUMIA_CONFIG.SEARCH.DEFAULT_LANGUAGE,
          },
          responseType: "text",
        },
      );

      const searchResult = this.parser.parse(response.data);

      return this.mapper.mapMany(searchResult.products);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `Jumia search failed (${error.response?.status ?? "Unknown"}): ${
            error.message
          }`,
        );
      }

      throw new Error(
        `Unexpected error while searching Jumia: ${
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
