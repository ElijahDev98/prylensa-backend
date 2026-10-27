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

import { ApiResponse } from "../../../shared/responses/api-response.js";

import type { RecordSearchActivityRequestDto } from "../dto/UserSearchActivityDto.js";
import type { IntelligenceService } from "../services/IntelligenceService.js";
import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";

export class IntelligenceController {
  constructor(private readonly service: IntelligenceService) {}

  public async recordSearchActivity(
    req: Request<unknown, unknown, RecordSearchActivityRequestDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await this.service.recordSearchActivity({
        ...req.body,
        userId: authenticatedUserId(req as Request),
      });

      ApiResponse.success(res, 201, "Search activity recorded.", response);
    } catch (error) {
      next(error);
    }
  }

  public async listSavedSearches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = await this.service.listSavedSearches(authenticatedUserId(req));
      ApiResponse.success(res, 200, "Saved searches loaded.", data);
    } catch (error) {
      next(error);
    }
  }

  public async saveSearch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = await this.service.saveSearch(
        authenticatedUserId(req),
        typeof req.body.query === "string" ? req.body.query : "",
      );
      ApiResponse.success(res, 201, "Search saved.", data);
    } catch (error) {
      next(error);
    }
  }

  public async removeSavedSearch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.service.removeSavedSearch(authenticatedUserId(req), String(req.params.id));
      ApiResponse.success(res, 200, "Saved search removed.", { removed: true });
    } catch (error) {
      next(error);
    }
  }

  public async markSavedSearchRefreshed(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = await this.service.markSavedSearchRefreshed(
        authenticatedUserId(req),
        String(req.params.id),
      );
      ApiResponse.success(res, 200, "Saved search refreshed.", data);
    } catch (error) {
      next(error);
    }
  }
}
