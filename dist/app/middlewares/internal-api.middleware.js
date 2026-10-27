import { timingSafeEqual } from "node:crypto";
import { env } from "../config/environment.js";
import { requireAuth } from "./auth.middleware.js";
function hasValidInternalApiKey(req) {
    const supplied = req.header("x-internal-api-key") ?? "";
    const expected = env.INTERNAL_AI_API_KEY;
    const suppliedBuffer = Buffer.from(supplied);
    const expectedBuffer = Buffer.from(expected);
    return suppliedBuffer.length === expectedBuffer.length &&
        timingSafeEqual(suppliedBuffer, expectedBuffer);
}
export function requireInternalApiKey(req, res, next) {
    if (!hasValidInternalApiKey(req)) {
        res.status(401).json({ success: false, message: "Invalid internal API key." });
        return;
    }
    next();
}
export function requireAuthOrInternalApiKey(req, res, next) {
    if (hasValidInternalApiKey(req)) {
        next();
        return;
    }
    void requireAuth(req, res, next);
}
//# sourceMappingURL=internal-api.middleware.js.map