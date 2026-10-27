import type {
  DashboardMetric,
  PriceAlert,
  RecentComparison,
  Recommendation,
  TrendingProduct,
} from "../models/Dashboard.js";

export interface DashboardResponseDto {
  metrics: DashboardMetric[];
  trendingProducts: TrendingProduct[];
  recommendations: Recommendation[];
  priceAlerts: PriceAlert[];
  recentComparisons: RecentComparison[];
  generatedAt: string;
}
