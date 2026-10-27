/**
 * -----------------------------------------------------------------------------
 * File: Dashboard.ts
 * Module: Dashboard
 *
 * Purpose:
 * Defines backend dashboard business models.
 * -----------------------------------------------------------------------------
 */
export type DashboardMetricLabel = "Products Tracked" | "Price Drops" | "Marketplace Offers" | "Stores Monitored";
export interface DashboardMetric {
    id: string;
    label: DashboardMetricLabel;
    value: number;
    changePercentage: number;
}
export type ProductTrend = "up" | "down";
export interface TrendingProduct {
    id: string;
    name: string;
    category: string;
    currentPrice: number;
    averagePrice: number;
    priceChangePercentage: number;
    trend: ProductTrend;
    stores: string[];
    bestPriceStore: string;
    isBestPrice: boolean;
    trendHistory: number[];
    thumbnail?: string;
    qualityScore: number;
    qualityLabel: string;
}
export type AlertDirection = "up" | "down";
export interface PriceAlert {
    id: string;
    product: string;
    store: string;
    currentPrice: number;
    previousPrice: number;
    direction: AlertDirection;
}
export type RecommendationPriority = "high" | "medium" | "low";
export interface Recommendation {
    id: string;
    title: string;
    description: string;
    priority: RecommendationPriority;
    feedback?: "helpful" | "not-helpful" | null;
}
export interface RecentComparison {
    id: string;
    product: string;
    comparedStores: number;
    bestPrice: number;
    comparedAt: string;
}
export interface Dashboard {
    metrics: DashboardMetric[];
    trendingProducts: TrendingProduct[];
    recommendations: Recommendation[];
    priceAlerts: PriceAlert[];
    recentComparisons: RecentComparison[];
    generatedAt: string;
}
