/**
 * -----------------------------------------------------------------------------
 * File: marketplace.routes.ts
 * Module: Marketplace
 *
 * Description:
 * Configures Marketplace HTTP routes.
 *
 * Responsibilities:
 * - Wire application dependencies.
 * - Register Marketplace endpoints.
 * - Export an Express Router.
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { MarketplaceController } from "../controllers/MarketplaceController.js";
import { MarketplaceService } from "../services/MarketplaceService.js";
import { MarketplaceRepository } from "../repositories/MarketplaceRepository.js";

import { KongaProvider } from "../providers/konga/KongaProvider.js";
import { SlotProvider } from "../providers/slot/SlotProvider.js";

const router = Router();

/**
 * Dependency graph
 */
const repository = new MarketplaceRepository([
  new KongaProvider(),
  new SlotProvider(),
]);

const service = new MarketplaceService(repository);

const controller = new MarketplaceController(service);

/**
 * GET /marketplace/search?q=iphone
 */
router.get("/search", controller.search.bind(controller));

export default router;
