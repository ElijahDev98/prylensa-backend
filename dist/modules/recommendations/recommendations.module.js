import { RecommendationController } from "./controllers/RecommendationController.js";
import { RecommendationService } from "./services/RecommendationService.js";
import { aiService } from "../ai/ai.module.js";
export const recommendationService = new RecommendationService();
export const recommendationController = new RecommendationController(recommendationService, aiService);
//# sourceMappingURL=recommendations.module.js.map