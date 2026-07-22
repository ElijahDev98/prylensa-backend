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
 * - Return standardized HTTP responses.
 *
 * This controller intentionally contains no marketplace business logic.
 * All business operations are delegated to MarketplaceService.
 * -----------------------------------------------------------------------------
 */

import type { NextFunction, Request, Response } from "express";

import { MarketplaceService } from "../services/MarketplaceService.js";

export class MarketplaceController {
  /**
   * Creates a MarketplaceController.
   */
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Searches all configured marketplaces.
   *
   * Route:
   * GET /marketplace/search?q=<keyword>
   *
   * Workflow:
   * 1. Read the search query.
   * 2. Validate the request.
   * 3. Delegate the search to MarketplaceService.
   * 4. Return grouped marketplace offers.
   *
   * Example Response:
   *
   * {
   *   success: true,
   *   count: 3,
   *   data: [...]
   * }
   */
  public async search(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      /**
       * Read the query parameter.
       */
      const query = String(req.query.q ?? "").trim();

      /**
       * Validate the incoming request.
       */
      if (!query) {
        res.status(400).json({
          success: false,
          message: "Query parameter 'q' is required.",
        });

        return;
      }

      /**
       * Execute the marketplace search pipeline.
       *
       * The service performs:
       * - Offer collection
       * - Deterministic matching
       * - AI semantic matching (placeholder)
       */
      const offerGroups = await this.service.search(query);

      /**
       * Return the grouped marketplace offers.
       */
      res.status(200).json({
        success: true,
        count: offerGroups.length,
        data: offerGroups,
      });
    } catch (error) {
      /**
       * Delegate unexpected errors to the global error middleware.
       */
      next(error);
    }
  }
}
