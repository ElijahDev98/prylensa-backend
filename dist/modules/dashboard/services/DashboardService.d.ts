/**
 * -----------------------------------------------------------------------------
 * File: DashboardService.ts
 * Module: Dashboard
 *
 * Purpose:
 * Builds dashboard intelligence from marketplace search results.
 * -----------------------------------------------------------------------------
 */
import type { MarketplaceService } from "../../marketplace/services/MarketplaceService.js";
import type { AiService } from "../../ai/services/AiService.js";
import type { RecommendationService } from "../../recommendations/services/RecommendationService.js";
import { SearchResponseMapper } from "../../marketplace/mappers/SearchResponseMapper.js";
import type { Dashboard } from "../models/Dashboard.js";
export declare class DashboardService {
    private readonly marketplaceService;
    private readonly aiService;
    private readonly recommendationService;
    private readonly searchResponseMapper;
    constructor(marketplaceService: MarketplaceService, aiService: AiService, recommendationService: RecommendationService, searchResponseMapper?: SearchResponseMapper);
    getDashboard(userId: string): Promise<Dashboard>;
    private getPersistedTrendingProducts;
    private getUserQueries;
    private getPersistedPriceAlerts;
    private getPersistedComparisons;
    private toDashboardCandidates;
    private getAiAnalyses;
    private toTrendingProduct;
    private getBestOffer;
    private getAveragePrice;
    private getUniqueMarketplaces;
    private getQualityLabel;
    private getPersistedMetrics;
    private toMetrics;
    private toRecommendations;
}
