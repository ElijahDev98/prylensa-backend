/**
 * -----------------------------------------------------------------------------
 * File: AiController.ts
 * Module: AI
 *
 * Purpose:
 * Handles AI analysis HTTP requests.
 * -----------------------------------------------------------------------------
 */
import { ApiResponse } from "../../../shared/responses/api-response.js";
export class AiController {
    service;
    constructor(service) {
        this.service = service;
    }
    async analyzeProduct(req, res, next) {
        try {
            const analysis = await this.service.analyzeProduct(req.body);
            ApiResponse.success(res, 200, "AI analysis generated.", analysis);
        }
        catch (error) {
            next(error);
        }
    }
    async compareProducts(req, res, next) {
        try {
            const comparison = await this.service.compareProducts(req.body);
            ApiResponse.success(res, 200, "AI product comparison generated.", comparison);
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=AiController.js.map