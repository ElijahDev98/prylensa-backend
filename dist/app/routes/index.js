/**
 * ================================================================
 * File: index.ts
 * Layer: Application Routes
 * Project: Prylensa Backend
 *
 * Purpose:
 *   Registers all top-level API routes for the Prylensa backend.
 *
 * Responsibilities:
 *   - Create the root API router.
 *   - Register feature modules.
 *   - Expose health check endpoint.
 *
 * This router acts as the gateway into the application.
 * ================================================================
 */
import { Router } from "express";
import aiRouter from "../../modules/ai/routes/ai.routes.js";
import alertRouter from "../../modules/alerts/routes/alert.routes.js";
import authRouter from "../../modules/auth/routes/auth.routes.js";
import dashboardRouter from "../../modules/dashboard/routes/dashboard.routes.js";
import intelligenceRouter from "../../modules/intelligence/routes/intelligence.routes.js";
import marketplaceRouter from "../../modules/marketplace/routes/marketplace.routes.js";
import settingsRouter from "../../modules/settings/routes/settings.routes.js";
import comparisonRouter from "../../modules/comparison/routes/comparison.routes.js";
import { prisma } from "../../shared/database/index.js";
import { aiService } from "../../modules/ai/ai.module.js";
import recommendationRouter from "../../modules/recommendations/routes/recommendation.routes.js";
const router = Router();
/**
 * ================================================================
 * Health Check
 *
 * GET /api/v1/health
 * ================================================================
 */
router.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Prylensa Backend is running successfully.",
        data: {
            status: "UP",
        },
        metadata: {
            service: "Prylensa Backend API",
            version: "v1",
            timestamp: new Date().toISOString(),
        },
    });
});
router.get("/ready", async (_req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        const aiReady = await aiService.isHealthy();
        res.status(aiReady ? 200 : 503).json({
            success: aiReady,
            data: { database: "UP", aiService: aiReady ? "UP" : "DOWN" },
        });
    }
    catch {
        res.status(503).json({
            success: false,
            data: { database: "DOWN", aiService: "UNKNOWN" },
        });
    }
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
 * Auth Module
 *
 * Base Route:
 * /api/v1/auth
 * ================================================================
 */
router.use("/auth", authRouter);
/**
 * ================================================================
 * Dashboard Module
 *
 * Base Route:
 * /api/v1/dashboard
 * ================================================================
 */
router.use("/dashboard", dashboardRouter);
/**
 * ================================================================
 * Intelligence Module
 *
 * Base Route:
 * /api/v1/intelligence
 * ================================================================
 */
router.use("/intelligence", intelligenceRouter);
/**
 * ================================================================
 * AI Module
 *
 * Base Route:
 * /api/v1/ai
 * ================================================================
 */
router.use("/ai", aiRouter);
router.use("/alerts", alertRouter);
router.use("/settings", settingsRouter);
router.use("/comparison", comparisonRouter);
router.use("/recommendations", recommendationRouter);
/**
 * ================================================================
 * Future Feature Modules
 * ================================================================
 *
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
//# sourceMappingURL=index.js.map