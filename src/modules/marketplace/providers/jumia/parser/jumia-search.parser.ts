/**
 * -----------------------------------------------------------------------------
 * Jumia Search Parser
 * -----------------------------------------------------------------------------
 *
 * Converts Jumia's HTML search fragment into strongly typed DTOs.
 *
 * Responsibilities:
 *  - Parse HTML
 *  - Extract embedded JSON
 *  - Deserialize JSON
 *  - Return provider DTOs
 *
 * No business logic belongs here.
 * -----------------------------------------------------------------------------
 */

import * as cheerio from "cheerio";

import type { JumiaProductDto } from "../dto/jumia-product.dto.js";
import type { JumiaSearchResponseDto } from "../dto/jumia-search-response.dto.js";

export class JumiaSearchParser {
  /**
   * Parses the Jumia search HTML fragment.
   */
  public parse(html: string): JumiaSearchResponseDto {
    const $ = cheerio.load(html);

    const productContainer = $("div[data-products-spon]").first();

    if (productContainer.length === 0) {
      throw new Error("Unable to locate embedded Jumia product metadata.");
    }

    const rawProducts = productContainer.attr("data-products-spon");

    if (!rawProducts) {
      throw new Error("Embedded Jumia product metadata is empty.");
    }

    let products: JumiaProductDto[];

    try {
      products = JSON.parse(rawProducts) as JumiaProductDto[];
    } catch (error) {
      throw new Error(
        `Failed to deserialize Jumia product metadata: ${
          error instanceof Error ? error.message : "Unknown parsing error"
        }`,
      );
    }

    return {
      products,
    };
  }
}
