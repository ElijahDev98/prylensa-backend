/**
 * -----------------------------------------------------------------------------
 * File: DashboardController.ts
 * Module: Dashboard
 *
 * Purpose:
 * Handles dashboard HTTP requests.
 * -----------------------------------------------------------------------------
 */
import type { NextFunction, Request, Response } from "express";
import { DashboardResponseMapper } from "../mappers/DashboardResponseMapper.js";
import type { DashboardService } from "../services/DashboardService.js";
export declare class DashboardController {
    private readonly service;
    private readonly responseMapper;
    constructor(service: DashboardService, responseMapper?: DashboardResponseMapper);
    getDashboard(req: Request, res: Response, next: NextFunction): Promise<void>;
}
