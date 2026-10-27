/**
 * -----------------------------------------------------------------------------
 * File: intelligence.routes.ts
 * Module: Intelligence
 *
 * Purpose:
 * Registers product-intelligence activity HTTP routes.
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { intelligenceController } from "../intelligence.module.js";
import { requireAuth } from "../../../app/middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/searches", intelligenceController.recordSearchActivity.bind(intelligenceController));
router.get("/saved-searches", intelligenceController.listSavedSearches.bind(intelligenceController));
router.post("/saved-searches", intelligenceController.saveSearch.bind(intelligenceController));
router.delete("/saved-searches/:id", intelligenceController.removeSavedSearch.bind(intelligenceController));
router.post(
  "/saved-searches/:id/refreshed",
  intelligenceController.markSavedSearchRefreshed.bind(intelligenceController),
);

export default router;
