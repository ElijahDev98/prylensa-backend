import { aiService } from "../ai/ai.module.js";
import { alertService } from "../alerts/alerts.module.js";
import {
  marketplaceService,
  searchDatasetService,
} from "../marketplace/marketplace.module.js";

import { IntelligenceMonitoringService } from "./IntelligenceMonitoringService.js";

export const intelligenceMonitoringService = new IntelligenceMonitoringService(
  marketplaceService,
  aiService,
  searchDatasetService,
  alertService,
);

