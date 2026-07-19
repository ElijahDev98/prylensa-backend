/**
 * -----------------------------------------------------------------------------
 * File: MarketplaceController.ts
 * Module: Marketplace
 *
 * Description:
 * Handles HTTP requests related to marketplace operations.
 *
 * Responsibilities:
 * - Receive and validate incoming HTTP requests.
 * - Delegate business logic to MarketplaceService.
 * - Return standardized JSON responses.
 * - Forward unexpected errors to Express error middleware.
 * -----------------------------------------------------------------------------
 */

import type { NextFunction, Request, Response } from "express";

import { MarketplaceService } from "../services/MarketplaceService.js";

/**
 * Request body for marketplace search.
 */
interface SearchRequestBody {
  query: string;
}

/**
 * Route parameters for retrieving a product.
 */
interface ProductParams {
  marketplace: string;
  productId: string;
}

/**
 * Typed request for search endpoint.
 */
type SearchRequest = Request<Record<string, never>, unknown, SearchRequestBody>;

/**
 * Typed request for product details endpoint.
 */
type ProductRequest = Request<ProductParams>;

export class MarketplaceController {
  /**
   * Marketplace business service.
   */
  private readonly marketplaceService: MarketplaceService;

  constructor(service?: MarketplaceService) {
    this.marketplaceService = service ?? new MarketplaceService();
  }

  /**
   * ---------------------------------------------------------------------------
   * Search Products
   *
   * POST /marketplace/search
   * ---------------------------------------------------------------------------
   */
  public search = async (
    req: SearchRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { query } = req.body;

      if (!query.trim()) {
        res.status(400).json({
          success: false,
          message: "Search query is required.",
        });

        return;
      }

      const offers = await this.marketplaceService.search(query);

      res.status(200).json({
        success: true,
        data: offers,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * ---------------------------------------------------------------------------
   * Get Product Details
   *
   * GET /marketplace/products/:marketplace/:productId
   * ---------------------------------------------------------------------------
   */
  public getProduct = async (
    req: ProductRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { marketplace, productId } = req.params;

      const product = await this.marketplaceService.getProduct(
        marketplace,
        productId,
      );

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };
}
