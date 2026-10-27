/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceController.ts
 * Module: Marketplace
 *
 * Description:
 * Handles HTTP requests for marketplace operations.
 *
 * Responsibilities:
 * - Receive HTTP requests.
 * - Validate request parameters.
 * - Delegate business logic to MarketplaceService.
 * - Map business models to API response DTOs.
 * - Return standardized HTTP responses.
 *
 * The controller contains no marketplace business logic.
 * -----------------------------------------------------------------------------
 */
import type { NextFunction, Request, Response } from "express";
import { SearchResponseMapper } from "../mappers/SearchResponseMapper.js";
import { MarketplaceService } from "../services/MarketplaceService.js";
import type { AiService } from "../../ai/services/AiService.js";
import type { SearchDatasetService } from "../services/SearchDatasetService.js";
import type { AlertService } from "../../alerts/services/AlertService.js";
import type { RecommendationService } from "../../recommendations/services/RecommendationService.js";
import { OfferFreshnessReconciler } from "../services/matching/OfferFreshnessReconciler.js";
export declare class MarketplaceController {
    private readonly service;
    private readonly aiService;
    private readonly searchDatasetService;
    private readonly alertService;
    private readonly recommendationService;
    private readonly responseMapper;
    private readonly freshnessReconciler;
    /**
     * Creates a MarketplaceController.
     */
    constructor(service: MarketplaceService, aiService: AiService, searchDatasetService: SearchDatasetService, alertService: AlertService, recommendationService: RecommendationService, responseMapper?: SearchResponseMapper, freshnessReconciler?: OfferFreshnessReconciler);
    /**
     * Searches all configured marketplaces.
     *
     * Route:
     * GET /marketplace/search?q=<keyword>
     *
     * Workflow:
     * --------------------------------------------------------------------------
     * 1. Read the query parameter.
     * 2. Validate the request.
     * 3. Delegate the search to MarketplaceService.
     * 4. Convert internal business models into response DTOs.
     * 5. Return a standardized JSON response.
     * --------------------------------------------------------------------------
     */
    search(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTrainingData(req: Request, res: Response, next: NextFunction): Promise<void>;
    private splitVariantGroups;
    getDatasetAnalytics(_req: Request, res: Response, next: NextFunction): Promise<void>;
    exportAiDataset(req: Request, res: Response, next: NextFunction): Promise<void>;
}
