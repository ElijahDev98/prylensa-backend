import { AlertController } from "./controllers/AlertController.js";
import { AlertService } from "./services/AlertService.js";
export const alertService = new AlertService();
export const alertController = new AlertController(alertService);
//# sourceMappingURL=alerts.module.js.map