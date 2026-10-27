/**
 * -----------------------------------------------------------------------------
 * File: IntelligenceController.ts
 * Module: Intelligence
 *
 * Purpose:
 * Handles product-intelligence activity HTTP requests.
 * -----------------------------------------------------------------------------
 */
import { ApiResponse } from "../../../shared/responses/api-response.js";
import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
export class IntelligenceController {
    service;
    constructor(service) {
        this.service = service;
    }
    async recordSearchActivity(req, res, next) {
        try {
            const response = await this.service.recordSearchActivity({
                ...req.body,
                userId: authenticatedUserId(req),
            });
            ApiResponse.success(res, 201, "Search activity recorded.", response);
        }
        catch (error) {
            next(error);
        }
    }
    async listSavedSearches(req, res, next) {
        try {
            const data = await this.service.listSavedSearches(authenticatedUserId(req));
            ApiResponse.success(res, 200, "Saved searches loaded.", data);
        }
        catch (error) {
            next(error);
        }
    }
    async saveSearch(req, res, next) {
        try {
            const data = await this.service.saveSearch(authenticatedUserId(req), typeof req.body.query === "string" ? req.body.query : "");
            ApiResponse.success(res, 201, "Search saved.", data);
        }
        catch (error) {
            next(error);
        }
    }
    async removeSavedSearch(req, res, next) {
        try {
            await this.service.removeSavedSearch(authenticatedUserId(req), String(req.params.id));
            ApiResponse.success(res, 200, "Saved search removed.", { removed: true });
        }
        catch (error) {
            next(error);
        }
    }
    async markSavedSearchRefreshed(req, res, next) {
        try {
            const data = await this.service.markSavedSearchRefreshed(authenticatedUserId(req), String(req.params.id));
            ApiResponse.success(res, 200, "Saved search refreshed.", data);
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=IntelligenceController.js.map