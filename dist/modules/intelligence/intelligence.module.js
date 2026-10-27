import { IntelligenceController } from "./controllers/IntelligenceController.js";
import { IntelligenceService } from "./services/IntelligenceService.js";
export const intelligenceService = new IntelligenceService();
export const intelligenceController = new IntelligenceController(intelligenceService);
//# sourceMappingURL=intelligence.module.js.map