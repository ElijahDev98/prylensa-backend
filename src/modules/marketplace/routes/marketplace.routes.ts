/**
 * -----------------------------------------------------------------------------
 * File: marketplace.routes.ts
 * Module: Marketplace
 *
 * Description:
 * Marketplace HTTP routes.
 *
 * Responsibilities:
 * - Register Marketplace endpoints.
 * - Delegate request handling to the controller.
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { marketplaceController } from "../marketplace.module.js";

const router = Router();

/**
 * GET /api/v1/marketplace/search?q=iphone
 */
router.get("/search", marketplaceController.search.bind(marketplaceController));

export default router;
