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
import type { SearchResponseDto } from "../dto/SearchResponseDto.js";
import type { SearchDatasetService } from "../services/SearchDatasetService.js";
import type { AlertService } from "../../alerts/services/AlertService.js";
import type { RecommendationService } from "../../recommendations/services/RecommendationService.js";
import { OfferFreshnessReconciler } from "../services/matching/OfferFreshnessReconciler.js";
import { createProductVariantKey } from "../services/matching/ProductVariantKey.js";

export class MarketplaceController {
  /**
   * Creates a MarketplaceController.
   */
  constructor(
    private readonly service: MarketplaceService,
    private readonly aiService: AiService,
    private readonly searchDatasetService: SearchDatasetService,
    private readonly alertService: AlertService,
    private readonly recommendationService: RecommendationService,
    private readonly responseMapper = new SearchResponseMapper(),
    private readonly freshnessReconciler = new OfferFreshnessReconciler(),
  ) {}

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
  public async search(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      /**
       * Read the search query.
       */
      const query = String(req.query.q ?? "").trim();

      /**
       * Validate the request.
       */
      if (!query) {
        res.status(400).json({
          success: false,
          message: "Query parameter 'q' is required.",
        });

        return;
      }

      /**
       * Execute the marketplace search workflow.
       */
      const matchedGroups = await this.service.search(query);

      /**
       * Convert internal models into public API DTOs.
       */
      const candidateResponse = this.responseMapper.toDtoList(matchedGroups);
      const semanticGrouping = await this.aiService.refineMarketplaceGroups(
        candidateResponse,
      );
      const response = this.splitVariantGroups(semanticGrouping.groups).map((group) => {
        const offers = this.freshnessReconciler.reconcileMatchedGroup(group.offers);
        return {
          ...group,
          offers,
          offerCount: offers.length,
        };
      });

      /**
       * AI is part of the search backbone. The backend enriches every
       * marketplace group with AI analysis before returning data to clients.
       */
      const aiAnalysis = await this.aiService.analyzeMarketplaceGroups(
        query,
        response,
      );

      const groupsByProductId = new Map(
        response.map((group) => [group.comparisonKey, group]),
      );

      /**
       * The AI response is authoritative for relevance. Building the result
       * from its ranked analyses prevents unrelated provider candidates from
       * leaking into the public search response.
       */
      const enrichedResponse: SearchResponseDto[] = aiAnalysis.analyses.flatMap(
        (analysis) => {
          const group = groupsByProductId.get(analysis.id);

          return group
            ? [
                {
                  ...group,
                  aiAnalysis: analysis,
                },
              ]
            : [];
        },
      ).sort((left, right) => {
        const rightCoverage = new Set(right.offers.map((offer) => offer.marketplace)).size;
        const leftCoverage = new Set(left.offers.map((offer) => offer.marketplace)).size;
        return rightCoverage - leftCoverage ||
          (right.aiAnalysis?.evaluation_score ?? 0) -
            (left.aiAnalysis?.evaluation_score ?? 0);
      });

      const respondingMarketplaces = [...new Set(
        enrichedResponse.flatMap((group) => group.offers.map((offer) => offer.marketplace)),
      )];
      const comparableGroupCount = enrichedResponse.filter(
        (group) => new Set(group.offers.map((offer) => offer.marketplace)).size >= 2,
      ).length;
      const persistedFallbackMarketplaces = [...new Set(
        enrichedResponse.flatMap((group) => group.offers)
          .filter((offer) => offer.dataSource === "persisted-snapshot")
          .map((offer) => offer.marketplace),
      )];
      const liveMarketplaces = [...new Set(
        enrichedResponse.flatMap((group) => group.offers)
          .filter((offer) => offer.dataSource !== "persisted-snapshot")
          .map((offer) => offer.marketplace),
      )];

      const dataset = await this.searchDatasetService.captureSearch({
        query,
        groups: enrichedResponse,
        aiGeneratedAt: aiAnalysis.generated_at,
      });

      if (req.auth) {
        await this.recommendationService.recordSearch(
          req.auth.userId,
          query,
          aiAnalysis.analyses,
        );
      }

      const triggeredAlerts = req.auth
        ? await this.alertService.evaluateActiveRules(req.auth.userId)
        : 0;

      /**
       * Return the API response.
       */
      res.status(200).json({
        success: true,
        count: enrichedResponse.length,
        ai: {
          generatedAt: aiAnalysis.generated_at,
          summary: aiAnalysis.summary,
          candidateCount: candidateResponse.length,
          relevantCount: enrichedResponse.length,
          grouping: {
            model: semanticGrouping.model,
            mergedGroups: semanticGrouping.merge_count,
            semanticOutputGroups: semanticGrouping.output_group_count,
            variantSafeGroups: response.length,
          },
        },
        marketplaceCoverage: {
          expected: ["Konga", "Slot", "Jumia"],
          responding: respondingMarketplaces,
          live: liveMarketplaces,
          persistedFallback: persistedFallbackMarketplaces,
          comparableGroupCount,
          threeStoreGroupCount: enrichedResponse.filter(
            (group) => new Set(group.offers.map((offer) => offer.marketplace)).size === 3,
          ).length,
        },
        dataset: {
          recorded: true,
          ...dataset,
        },
        alerts: {
          evaluated: true,
          triggered: triggeredAlerts,
        },
        data: enrichedResponse,
      });
    } catch (error) {
      /**
       * Delegate unexpected errors to the global error middleware.
       */
      next(error);
    }
  }

  public async getTrainingData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const limit = Number(req.query.limit ?? 250);
      const cursor = String(req.query.cursor ?? "").trim() || undefined;
      const query = String(req.query.q ?? "").trim() || undefined;
      const response = await this.searchDatasetService.getTrainingDataset({
        limit: Number.isFinite(limit) ? limit : 250,
        cursor,
        query,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  private splitVariantGroups(groups: SearchResponseDto[]): SearchResponseDto[] {
    return groups.flatMap((group) => {
      const variants = new Map<string, SearchResponseDto["offers"]>();
      for (const offer of group.offers) {
        const key = createProductVariantKey(offer.title);
        const existing = variants.get(key) ?? [];
        existing.push(offer);
        variants.set(key, existing);
      }

      return [...variants.entries()].map(([variant, offers]) => ({
        comparisonKey: variants.size === 1
          ? group.comparisonKey
          : `${group.comparisonKey}|${variant}`,
        offers,
        offerCount: offers.length,
      }));
    });
  }

  public async getDatasetAnalytics(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(200).json(await this.searchDatasetService.getAnalytics());
    } catch (error) {
      next(error);
    }
  }

  public async exportAiDataset(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const query = String(req.query.q ?? "").trim() || undefined;
      const requestedMaximum = Number(req.query.maximumRecords ?? 50000);
      const maximumRecords = Number.isFinite(requestedMaximum)
        ? Math.min(Math.max(Math.trunc(requestedMaximum), 1), 50000)
        : 50000;

      const dataset = await this.aiService.exportTrainingDataset(
        query,
        maximumRecords,
      );

      res.status(200).json({ success: true, data: dataset });
    } catch (error) {
      next(error);
    }
  }
}
