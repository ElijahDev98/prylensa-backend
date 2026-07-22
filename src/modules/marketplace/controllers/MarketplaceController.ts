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

export class MarketplaceController {
  /**
   * Creates a MarketplaceController.
   */
  constructor(
    private readonly service: MarketplaceService,
    private readonly responseMapper = new SearchResponseMapper(),
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
      const response = this.responseMapper.toDtoList(matchedGroups);

      /**
       * Return the API response.
       */
      res.status(200).json({
        success: true,
        count: response.length,
        data: response,
      });
    } catch (error) {
      /**
       * Delegate unexpected errors to the global error middleware.
       */
      next(error);
    }
  }
}
