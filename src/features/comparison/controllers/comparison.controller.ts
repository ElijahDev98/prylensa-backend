import type { Request, Response, NextFunction } from "express";

import { ComparisonService } from "../services/comparison.service.js";

/**
 * Handles HTTP requests related to product comparison.
 *
 * The controller is intentionally thin. Its responsibility is to
 * validate the incoming request, delegate work to the
 * ComparisonService and return an HTTP response.
 */
export class ComparisonController {
  /**
   * Creates a new ComparisonController.
   *
   * @param comparisonService Application service responsible for
   * comparison workflow.
   */
  constructor(private readonly comparisonService: ComparisonService) {}

  /**
   * Searches for a product across all registered providers.
   *
   * GET /api/comparisons?query=iphone+15
   */
  public compare = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const query = String(request.query.query ?? "").trim();

      if (!query) {
        response.status(400).json({
          message: "Query parameter is required.",
        });

        return;
      }

      const offers = await this.comparisonService.compare(query);

      response.status(200).json(offers);
    } catch (error) {
      next(error);
    }
  };
}
