/**
 * -----------------------------------------------------------------------------
 * File: AuthController.ts
 * Module: Auth
 *
 * Purpose:
 * Handles auth HTTP requests.
 * -----------------------------------------------------------------------------
 */
import { ApiResponse } from "../../../shared/responses/api-response.js";
export class AuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    async signInGuest(req, res, next) {
        try {
            const response = await this.service.signInGuest(req.body.email);
            ApiResponse.success(res, 200, "Guest session created.", response);
        }
        catch (error) {
            next(error);
        }
    }
    async signOut(req, res, next) {
        try {
            if (!req.auth)
                throw new Error("Authenticated session is required.");
            await this.service.signOut(req.auth.sessionId);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=AuthController.js.map