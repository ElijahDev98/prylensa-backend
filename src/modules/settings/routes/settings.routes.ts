import { Router } from "express";

import { SettingsService } from "../services/SettingsService.js";
import { authenticatedUserId, requireAuth } from "../../../app/middlewares/auth.middleware.js";

const router = Router();
const service = new SettingsService();

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const userId = authenticatedUserId(req);
    res.status(200).json({ success: true, data: await service.get(userId) });
  } catch (error) { next(error); }
});

router.put("/", async (req, res, next) => {
  try {
    const userId = authenticatedUserId(req);
    const data = await service.update(userId, {
      currency: typeof req.body.currency === "string" ? req.body.currency : undefined,
      notificationsEnabled: typeof req.body.notificationsEnabled === "boolean"
        ? req.body.notificationsEnabled
        : undefined,
      theme: typeof req.body.theme === "string" ? req.body.theme : undefined,
    });
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
});

export default router;
