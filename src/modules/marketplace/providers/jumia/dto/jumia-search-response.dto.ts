/**
 * -----------------------------------------------------------------------------
 * Jumia Search Response DTO
 * -----------------------------------------------------------------------------
 *
 * Represents the normalized output produced by the Jumia parser after
 * extracting embedded product metadata from the HTML fragment.
 *
 * This object forms the boundary between:
 *
 * Provider
 *     ↓
 * Parser
 *     ↓
 * DTO
 *     ↓
 * Mapper
 *     ↓
 * Offer Domain
 *
 * The provider never maps directly to the Offer model.
 * -----------------------------------------------------------------------------
 */

import { JumiaProductDto } from "./jumia-product.dto.js";

export interface JumiaSearchResponseDto {
  /**
   * Collection of products returned by the search.
   */
  products: JumiaProductDto[];
}
