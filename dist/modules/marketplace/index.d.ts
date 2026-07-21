/**
 * -----------------------------------------------------------------------------
 * File: index.ts
 * Module: Marketplace
 *
 * Description:
 * Public exports for the Marketplace module.
 *
 * Responsibilities:
 * - Centralize exports.
 * - Reduce deep import paths.
 * - Provide a clean public API for the module.
 * -----------------------------------------------------------------------------
 */
export * from "./models/Offer.js";
export * from "./models/Product.js";
export * from "./models/SearchResult.js";
export * from "./providers/MarketplaceProvider.js";
export * from "./repositories/MarketplaceRepository.js";
export * from "./services/MarketplaceService.js";
export * from "./controllers/MarketplaceController.js";
