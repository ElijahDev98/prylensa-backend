/**
 * -----------------------------------------------------------------------------
 * File: auth.routes.ts
 * Module: Auth
 *
 * Purpose:
 * Registers auth HTTP routes.
 * -----------------------------------------------------------------------------
 */

import { Router } from "express";

import { authController } from "../auth.module.js";
import { requireAuth } from "../../../app/middlewares/auth.middleware.js";

const router = Router();

router.post("/guest", authController.signInGuest.bind(authController));
router.post("/sign-out", requireAuth, authController.signOut.bind(authController));

export default router;
