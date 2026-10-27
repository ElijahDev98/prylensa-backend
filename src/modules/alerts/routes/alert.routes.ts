import { Router } from "express";

import { alertController } from "../alerts.module.js";
import { requireAuth } from "../../../app/middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", alertController.list.bind(alertController));
router.post("/", alertController.create.bind(alertController));
router.patch("/:id", alertController.update.bind(alertController));
router.delete("/:id", alertController.remove.bind(alertController));
router.post("/actions/evaluate", alertController.evaluate.bind(alertController));
router.get("/events/stream", alertController.stream.bind(alertController));
router.get("/events/notifications", alertController.notifications.bind(alertController));
router.patch("/events/notifications/:id/read", alertController.markRead.bind(alertController));

export default router;
