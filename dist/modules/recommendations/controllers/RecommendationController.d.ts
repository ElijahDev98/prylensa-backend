import type { NextFunction, Request, Response } from "express";
import type { RecommendationService } from "../services/RecommendationService.js";
import type { AiService } from "../../ai/services/AiService.js";
export declare class RecommendationController {
    private readonly service;
    private readonly aiService;
    constructor(service: RecommendationService, aiService: AiService);
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    feedback(req: Request, res: Response, next: NextFunction): Promise<void>;
    trainingData(_req: Request, res: Response, next: NextFunction): Promise<void>;
}
