import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
export class ComparisonWorkspaceController {
    service;
    constructor(service) {
        this.service = service;
    }
    async get(req, res, next) {
        try {
            res.status(200).json({ success: true, data: await this.service.get(authenticatedUserId(req)) });
        }
        catch (error) {
            next(error);
        }
    }
    async save(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                data: await this.service.save(authenticatedUserId(req), req.body.items),
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=ComparisonWorkspaceController.js.map