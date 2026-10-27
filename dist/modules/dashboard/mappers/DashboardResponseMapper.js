/**
 * -----------------------------------------------------------------------------
 * File: DashboardResponseMapper.ts
 * Module: Dashboard
 *
 * Purpose:
 * Maps dashboard business models into public API DTOs.
 * -----------------------------------------------------------------------------
 */
export class DashboardResponseMapper {
    toDto(dashboard) {
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
//# sourceMappingURL=DashboardResponseMapper.js.map