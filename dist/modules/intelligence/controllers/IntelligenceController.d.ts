/**
 * -----------------------------------------------------------------------------
 * File: IntelligenceController.ts
 * Module: Intelligence
 *
 * Purpose:
 * Handles product-intelligence activity HTTP requests.
 * -----------------------------------------------------------------------------
 */
import type { NextFunction, Request, Response } from "express";
import type { RecordSearchActivityRequestDto } from "../dto/UserSearchActivityDto.js";
import type { IntelligenceService } from "../services/IntelligenceService.js";
export declare class IntelligenceController {
    private readonly service;
    constructor(service: IntelligenceService);
    recordSearchActivity(req: Request<unknown, unknown, RecordSearchActivityRequestDto>, res: Response, next: NextFunction): Promise<void>;
    listSavedSearches(req: Request, res: Response, next: NextFunction): Promise<void>;
    saveSearch(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeSavedSearch(req: Request, res: Response, next: NextFunction): Promise<void>;
    markSavedSearchRefreshed(req: Request, res: Response, next: NextFunction): Promise<void>;
}
