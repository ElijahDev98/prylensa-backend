/**
 * -----------------------------------------------------------------------------
 * File: index.ts
 * Module: Marketplace
 *
 * Description:
 * Public exports for the Jumia marketplace provider.
 *
 * Responsibilities:
 * - Expose the provider.
 * - Expose provider-specific DTOs.
 * - Expose parser and mapper.
 * -----------------------------------------------------------------------------
 */
export * from "./JumiaProvider.js";
export * from "./config/index.js";
export * from "./dto/jumia-price.dto.js";
export * from "./dto/jumia-rating.dto.js";
export * from "./dto/jumia-product.dto.js";
export * from "./dto/jumia-search-response.dto.js";
export * from "./parser/index.js";
export * from "./mapper/index.js";
