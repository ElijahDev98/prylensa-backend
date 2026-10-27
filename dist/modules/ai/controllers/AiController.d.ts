/**
 * -----------------------------------------------------------------------------
 * File: AiController.ts
 * Module: AI
 *
 * Purpose:
 * Handles AI analysis HTTP requests.
 * -----------------------------------------------------------------------------
 */
import type { NextFunction, Request, Response } from "express";
import type { AiProductAnalysisRequestDto, AiProductComparisonRequestDto } from "../dto/AiAnalysisDto.js";
import type { AiService } from "../services/AiService.js";
export declare class AiController {
    private readonly service;
    constructor(service: AiService);
    analyzeProduct(req: Request<unknown, unknown, AiProductAnalysisRequestDto>, res: Response, next: NextFunction): Promise<void>;
    compareProducts(req: Request<unknown, unknown, AiProductComparisonRequestDto>, res: Response, next: NextFunction): Promise<void>;
}
