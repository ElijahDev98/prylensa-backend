/**
 * -----------------------------------------------------------------------------
 * File: dashboard.routes.ts
 * Module: Dashboard
 *
 * Purpose:
 * Registers dashboard HTTP routes.
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { dashboardController } from "../dashboard.module.js";
import { requireAuth } from "../../../app/middlewares/auth.middleware.js";

const router = Router();
router.use(requireAuth);

router.get("/", dashboardController.getDashboard.bind(dashboardController));

export default router;
