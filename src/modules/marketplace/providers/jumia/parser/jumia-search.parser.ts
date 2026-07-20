/**
 * -----------------------------------------------------------------------------
 * Jumia Search Parser
 * -----------------------------------------------------------------------------
 *
 * Responsible for extracting embedded marketplace product data from Jumia's
 * HTML search fragment.
 *
 * Responsibilities:
 *
 * 1. Parse the HTML fragment.
 * 2. Locate embedded product metadata.
 * 3. Extract the raw JSON payload.
 *
 * JSON deserialization is implemented in the next phase.
 * -----------------------------------------------------------------------------
 */

import * as cheerio from "cheerio";

import type { JumiaSearchResponseDto } from "../dto/jumia-search-response.dto.js";

export class JumiaSearchParser {
  /**
   * Parses a Jumia search fragment.
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

    /**
     * Phase 2.2
     *
     * Decode HTML entities.
     * Deserialize JSON.
     */
    throw new Error("Jumia product extraction completed.");
  }
}
