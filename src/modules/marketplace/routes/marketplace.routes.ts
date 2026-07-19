/**
 * -----------------------------------------------------------------------------
 * File: marketplace.routes.ts
 * Module: Marketplace
 *
 * Description:
 * Defines all HTTP routes for marketplace-related operations.
 *
 * Responsibilities:
 * - Register marketplace endpoints.
 * - Delegate requests to MarketplaceController.
 * - Keep routing separate from controllers and business logic.
 *
 * Endpoints:
 * POST   /search
 * GET    /products/:marketplace/:productId
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { MarketplaceController } from "../controllers/MarketplaceController.js";

/**
 * Express router for Marketplace module.
 */
const marketplaceRouter = Router();

/**
 * Marketplace controller instance.
 */
const marketplaceController = new MarketplaceController();

/**
 * -----------------------------------------------------------------------------
 * Search Products
 *
 * POST /api/marketplace/search
 *
 * Request Body:
 * {
 *   "query": "Samsung A17"
 * }
 * -----------------------------------------------------------------------------
 */
marketplaceRouter.post("/search", marketplaceController.search);

/**
 * -----------------------------------------------------------------------------
 * Get Product Details
 *
 * GET /api/marketplace/products/:marketplace/:productId
 *
 * Example:
 * GET /api/marketplace/products/konga/123456
 * -----------------------------------------------------------------------------
 */
marketplaceRouter.get(
  "/products/:marketplace/:productId",
  marketplaceController.getProduct,
);

/**
 * Export Marketplace router.
 */
export default marketplaceRouter;
