import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
export class RecommendationController {
    service;
    aiService;
    constructor(service, aiService) {
        this.service = service;
        this.aiService = aiService;
    }
    async list(req, res, next) {
        try {
            res.status(200).json({ success: true, data: await this.service.list(authenticatedUserId(req)) });
        }
        catch (error) {
            next(error);
        }
    }
    async feedback(req, res, next) {
        try {
            await this.service.feedback(authenticatedUserId(req), String(req.params.id), String(req.body.feedback ?? ""));
            void this.aiService.retrainRecommendationFeedbackModel().catch((error) => {
                console.warn("[RecommendationFeedback] Retraining trigger failed.", error);
            });
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    async trainingData(_req, res, next) {
        try {
            const data = await this.service.feedbackTrainingData();
            res.status(200).json({
                version: "recommendation-feedback-v1",
                count: data.length,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=RecommendationController.js.map