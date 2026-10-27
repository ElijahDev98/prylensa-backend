import type { NextFunction, Request, Response } from "express";
import type { ComparisonWorkspaceService } from "../services/ComparisonWorkspaceService.js";
export declare class ComparisonWorkspaceController {
    private readonly service;
    constructor(service: ComparisonWorkspaceService);
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    save(req: Request, res: Response, next: NextFunction): Promise<void>;
}
