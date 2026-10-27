import type { NextFunction, Request, Response } from "express";

import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
import type { ComparisonWorkspaceService } from "../services/ComparisonWorkspaceService.js";

export class ComparisonWorkspaceController {
  constructor(private readonly service: ComparisonWorkspaceService) {}

  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json({ success: true, data: await this.service.get(authenticatedUserId(req)) });
    } catch (error) { next(error); }
  }

  public async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json({
        success: true,
        data: await this.service.save(authenticatedUserId(req), req.body.items),
      });
    } catch (error) { next(error); }
  }
}
