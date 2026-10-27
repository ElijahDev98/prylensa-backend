/**
 * -----------------------------------------------------------------------------
 * File: marketplace.module.ts
 * Module: Marketplace
 *
 * Description:
 * Marketplace feature composition root.
 *
 * Responsibilities:
 * - Instantiate marketplace providers.
 * - Configure repository.
 * - Configure service.
 * - Configure controller.
 * - Export the configured controller.
 *
 * Notes:
 * - This is the only file responsible for wiring Marketplace dependencies.
 * - No business logic should exist here.
 * -----------------------------------------------------------------------------
 */
import { MarketplaceController } from "./controllers/MarketplaceController.js";
import { MarketplaceService } from "./services/MarketplaceService.js";
import { SearchDatasetService } from "./services/SearchDatasetService.js";
/**
 * Service.
 */
export declare const marketplaceService: MarketplaceService;
export declare const searchDatasetService: SearchDatasetService;
/**
 * Marketplace controller.
 */
export declare const marketplaceController: MarketplaceController;
