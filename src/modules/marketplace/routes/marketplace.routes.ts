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
import {
  requireAuthOrInternalApiKey,
  requireInternalApiKey,
} from "../../../app/middlewares/internal-api.middleware.js";

const router = Router();

/**
 * GET /api/v1/marketplace/search?q=iphone
 */
router.get(
  "/search",
  requireAuthOrInternalApiKey,
  marketplaceController.search.bind(marketplaceController),
);

router.get(
  "/training-data",
  requireInternalApiKey,
  marketplaceController.getTrainingData.bind(marketplaceController),
);

router.get(
  "/dataset-analytics",
  requireInternalApiKey,
  marketplaceController.getDatasetAnalytics.bind(marketplaceController),
);

router.get(
  "/ai-dataset-export",
  requireAuthOrInternalApiKey,
  marketplaceController.exportAiDataset.bind(marketplaceController),
);

export default router;
