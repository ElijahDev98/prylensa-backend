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
 * - Return HTTP responses.
 * -----------------------------------------------------------------------------
 */

import { Request, Response, NextFunction } from "express";

import { MarketplaceService } from "../services/MarketplaceService.js";

export class MarketplaceController {
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Searches all configured marketplaces.
   *
   * GET /marketplace/search?q=iphone
   */
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = String(req.query.q ?? "").trim();

      if (!query) {
        res.status(400).json({
          success: false,
          message: "Query parameter 'q' is required.",
        });

        return;
      }

      const offers = await this.service.search(query);

      res.status(200).json({
        success: true,
        count: offers.length,
        data: offers,
      });
    } catch (error) {
      next(error);
    }
  }
}
