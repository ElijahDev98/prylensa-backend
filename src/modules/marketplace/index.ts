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

// Domain Models
export * from "./models/Offer.js";
export * from "./models/Product.js";
export * from "./models/SearchResult.js";

// Provider Contracts
export * from "./providers/MarketplaceProvider.js";

// Repository
export * from "./repositories/MarketplaceRepository.js";

// Service
export * from "./services/MarketplaceService.js";

// Controller
export * from "./controllers/MarketplaceController.js";
