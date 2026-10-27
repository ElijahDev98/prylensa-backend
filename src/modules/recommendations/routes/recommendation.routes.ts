import { Router } from "express";
import { requireAuth } from "../../../app/middlewares/auth.middleware.js";
import { requireInternalApiKey } from "../../../app/middlewares/internal-api.middleware.js";
import { recommendationController } from "../recommendations.module.js";

const router = Router();
router.get(
  "/training-data",
  requireInternalApiKey,
  recommendationController.trainingData.bind(recommendationController),
);
router.use(requireAuth);
router.get("/", recommendationController.list.bind(recommendationController));
router.patch("/:id/feedback", recommendationController.feedback.bind(recommendationController));
export default router;
