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

import { ApiResponse } from "../../../shared/responses/api-response.js";

import type {
  AiProductAnalysisRequestDto,
  AiProductComparisonRequestDto,
} from "../dto/AiAnalysisDto.js";
import type { AiService } from "../services/AiService.js";

export class AiController {
  constructor(private readonly service: AiService) {}

  public async analyzeProduct(
    req: Request<unknown, unknown, AiProductAnalysisRequestDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const analysis = await this.service.analyzeProduct(req.body);

      ApiResponse.success(res, 200, "AI analysis generated.", analysis);
    } catch (error) {
      next(error);
    }
  }

  public async compareProducts(
    req: Request<unknown, unknown, AiProductComparisonRequestDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const comparison = await this.service.compareProducts(req.body);

      ApiResponse.success(
        res,
        200,
        "AI product comparison generated.",
        comparison,
      );
    } catch (error) {
      next(error);
    }
  }
}
