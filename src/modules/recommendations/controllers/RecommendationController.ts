import type { NextFunction, Request, Response } from "express";
import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
import type { RecommendationService } from "../services/RecommendationService.js";
import type { AiService } from "../../ai/services/AiService.js";

export class RecommendationController {
  constructor(
    private readonly service: RecommendationService,
    private readonly aiService: AiService,
  ) {}
  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json({ success: true, data: await this.service.list(authenticatedUserId(req)) });
    } catch (error) { next(error); }
  }
  public async feedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.feedback(authenticatedUserId(req), String(req.params.id), String(req.body.feedback ?? ""));
      void this.aiService.retrainRecommendationFeedbackModel().catch((error) => {
        console.warn("[RecommendationFeedback] Retraining trigger failed.", error);
      });
      res.status(204).send();
    } catch (error) { next(error); }
  }
  public async trainingData(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.service.feedbackTrainingData();
      res.status(200).json({
        version: "recommendation-feedback-v1",
        count: data.length,
        data,
      });
    } catch (error) { next(error); }
  }
}
