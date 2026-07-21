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
export declare class MarketplaceController {
    private readonly service;
    constructor(service: MarketplaceService);
    /**
     * Searches all configured marketplaces.
     *
     * GET /marketplace/search?q=iphone
     */
    search(req: Request, res: Response, next: NextFunction): Promise<void>;
}
