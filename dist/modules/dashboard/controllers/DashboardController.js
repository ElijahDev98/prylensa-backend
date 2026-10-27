/**
 * -----------------------------------------------------------------------------
 * File: DashboardController.ts
 * Module: Dashboard
 *
 * Purpose:
 * Handles dashboard HTTP requests.
 * -----------------------------------------------------------------------------
 */
import { ApiResponse } from "../../../shared/responses/api-response.js";
import { DashboardResponseMapper } from "../mappers/DashboardResponseMapper.js";
import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
export class DashboardController {
    service;
    responseMapper;
    constructor(service, responseMapper = new DashboardResponseMapper()) {
        this.service = service;
        this.responseMapper = responseMapper;
    }
    async getDashboard(req, res, next) {
        try {
            const dashboard = await this.service.getDashboard(authenticatedUserId(req));
            const response = this.responseMapper.toDto(dashboard);
            ApiResponse.success(res, 200, "Dashboard data loaded successfully.", response);
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=DashboardController.js.map