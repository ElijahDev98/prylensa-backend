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

import { ApiResponse } from "../../../shared/responses/api-response.js";

import { DashboardResponseMapper } from "../mappers/DashboardResponseMapper.js";
import type { DashboardService } from "../services/DashboardService.js";
import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";

export class DashboardController {
  constructor(
    private readonly service: DashboardService,
    private readonly responseMapper = new DashboardResponseMapper(),
  ) {}

  public async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dashboard = await this.service.getDashboard(authenticatedUserId(req));
      const response = this.responseMapper.toDto(dashboard);

      ApiResponse.success(
        res,
        200,
        "Dashboard data loaded successfully.",
        response,
      );
    } catch (error) {
      next(error);
    }
  }
}
