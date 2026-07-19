/**
 * ================================================================
 * File: index.ts
 * Layer: Application Routes
 * Project: Priciq Backend
 *
 * Purpose:
 *   Registers all top-level API routes for the Priciq backend.
 *
 * Responsibilities:
 *   - Create the root API router.
 *   - Register feature modules.
 *   - Expose health check endpoint.
 *
 * This router acts as the gateway into the application.
 * ================================================================
 */

import { Router, type Request, type Response } from "express";

import marketplaceRouter from "../../modules/marketplace/routes/marketplace.routes.js";

const router = Router();

/**
 * ================================================================
 * Health Check
 *
 * GET /api/v1/health
 * ================================================================
 */
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Priciq Backend is running successfully.",
    data: {
      status: "UP",
    },
    metadata: {
      service: "Priciq Backend API",
      version: "v1",
      timestamp: new Date().toISOString(),
    },
  });
});

/**
 * ================================================================
 * Marketplace Module
 *
 * Base Route:
 * /api/v1/marketplace
 * ================================================================
 */
router.use("/marketplace", marketplaceRouter);

/**
 * ================================================================
 * Future Feature Modules
 * ================================================================
 *
 * router.use("/dashboard", dashboardRouter);
 * router.use("/search", searchRouter);
 * router.use("/products", productRouter);
 * router.use("/offers", offerRouter);
 * router.use("/stores", storeRouter);
 * router.use("/comparison", comparisonRouter);
 * router.use("/alerts", alertRouter);
 * router.use("/recommendations", recommendationRouter);
 * router.use("/settings", settingsRouter);
 * router.use("/users", userRouter);
 */

export default router;
