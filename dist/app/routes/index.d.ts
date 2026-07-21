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
declare const router: import("express-serve-static-core").Router;
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
