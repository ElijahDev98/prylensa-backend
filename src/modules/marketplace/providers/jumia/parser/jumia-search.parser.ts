/**
 * -----------------------------------------------------------------------------
 * Jumia Search Parser
 * -----------------------------------------------------------------------------
 *
 * Responsible for converting Jumia's HTML search fragment into strongly typed
 * DTOs.
 *
 * Responsibilities:
 *
 * 1. Parse the HTML fragment returned by Jumia.
 * 2. Extract embedded marketplace product data.
 * 3. Deserialize the embedded JSON.
 * 4. Produce JumiaSearchResponseDto.
 *
 * This layer contains NO business logic.
 *
 * Architecture
 *
 * Provider
 *     ↓
 * Parser
 *     ↓
 * DTO
 *     ↓
 * Mapper
 *     ↓
 * Domain
 * -----------------------------------------------------------------------------
 */

import * as cheerio from "cheerio";

import type { JumiaSearchResponseDto } from "../dto/jumia-search-response.dto.js";

export class JumiaSearchParser {
  /**
   * Parses the Jumia search HTML fragment.
   */
  public parse(html: string): JumiaSearchResponseDto {
    const $ = cheerio.load(html);

    /**
     * Implementation will be added in the next milestone.
     */
    throw new Error("JumiaSearchParser.parse() is not implemented.");
  }
}
