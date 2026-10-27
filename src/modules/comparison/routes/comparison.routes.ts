import { Router } from "express";

import { requireAuth } from "../../../app/middlewares/auth.middleware.js";
import { comparisonWorkspaceController } from "../comparison.module.js";

const router = Router();
router.use(requireAuth);
router.get("/workspace", comparisonWorkspaceController.get.bind(comparisonWorkspaceController));
router.put("/workspace", comparisonWorkspaceController.save.bind(comparisonWorkspaceController));

export default router;
