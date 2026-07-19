/**
 * -----------------------------------------------------------------------------
 * File: marketplace.routes.ts
 * Module: Marketplace
 *
 * Description:
 * Registers Marketplace HTTP endpoints.
 *
 * Responsibilities:
 * - Map HTTP routes to controller actions.
 * - Delegate all processing to the controller.
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { marketplaceController } from "../marketplace.module.js";

const router = Router();

/**
 * GET /search?q=iphone
 */
router.get("/search", marketplaceController.search.bind(marketplaceController));

export default router;
