import { AiController } from "./controllers/AiController.js";
import { AiService } from "./services/AiService.js";
const service = new AiService();
export const aiService = service;
export const aiController = new AiController(aiService);
//# sourceMappingURL=ai.module.js.map