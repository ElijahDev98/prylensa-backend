/**
 * -----------------------------------------------------------------------------
 * File: dashboard.module.ts
 * Module: Dashboard
 *
 * Purpose:
 * Composes Dashboard dependencies.
 * -----------------------------------------------------------------------------
 */

import { marketplaceService } from "../marketplace/marketplace.module.js";
import { aiService } from "../ai/ai.module.js";

import { DashboardController } from "./controllers/DashboardController.js";
import { DashboardService } from "./services/DashboardService.js";
import { recommendationService } from "../recommendations/recommendations.module.js";

const service = new DashboardService(marketplaceService, aiService, recommendationService);

export const dashboardController = new DashboardController(service);
