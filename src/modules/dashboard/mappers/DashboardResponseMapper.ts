/**
 * -----------------------------------------------------------------------------
 * File: DashboardResponseMapper.ts
 * Module: Dashboard
 *
 * Purpose:
 * Maps dashboard business models into public API DTOs.
 * -----------------------------------------------------------------------------
 */

import type { DashboardResponseDto } from "../dto/DashboardResponseDto.js";
import type { Dashboard } from "../models/Dashboard.js";

export class DashboardResponseMapper {
  public toDto(dashboard: Dashboard): DashboardResponseDto {
    return {
      metrics: dashboard.metrics,
      trendingProducts: dashboard.trendingProducts,
      recommendations: dashboard.recommendations,
      priceAlerts: dashboard.priceAlerts,
      recentComparisons: dashboard.recentComparisons,
      generatedAt: dashboard.generatedAt,
    };
  }
}
