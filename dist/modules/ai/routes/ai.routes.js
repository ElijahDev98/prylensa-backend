/**
 * -----------------------------------------------------------------------------
 * File: ai.routes.ts
 * Module: AI
 *
 * Purpose:
 * Registers backend AI integration routes.
 * -----------------------------------------------------------------------------
 */
import { Router } from "express";
import { aiController } from "../ai.module.js";
import { requireAuth } from "../../../app/middlewares/auth.middleware.js";
const router = Router();
router.use(requireAuth);
router.post("/analyze", aiController.analyzeProduct.bind(aiController));
router.post("/compare", aiController.compareProducts.bind(aiController));
export default router;
//# sourceMappingURL=ai.routes.js.map