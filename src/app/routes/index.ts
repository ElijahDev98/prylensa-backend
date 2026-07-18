/**
 * ================================================================
 * File: index.ts
 * Layer: Application Routes
 *
 * Purpose:
 *   Registers all top-level API routes for the Priciq backend.
 *
 * Responsibilities:
 *   - Create the root API router
 *   - Register feature routes
 *
 * This router acts as the gateway into the application.
 * ================================================================
 */

import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * ================================================================
 * Health Check Endpoint
 * ================================================================
 *
 * Used to verify that the backend application is running.
 *
 * Route:
 *   GET /api/v1/health
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
 * Future Feature Routes
 *
 * Example:
 *
 * router.use("/dashboard", dashboardRoutes);
 * router.use("/search", searchRoutes);
 * router.use("/products", productRoutes);
 * router.use("/offers", offerRoutes);
 * router.use("/stores", storeRoutes);
 * router.use("/comparison", comparisonRoutes);
 * router.use("/alerts", alertRoutes);
 * router.use("/settings", settingsRoutes);
 * router.use("/recommendations", recommendationRoutes);
 * router.use("/users", userRoutes);
 */

export default router;
