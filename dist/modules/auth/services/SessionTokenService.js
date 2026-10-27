import { createHmac, randomBytes } from "node:crypto";
import { env } from "../../../app/config/environment.js";
export class SessionTokenService {
    createToken() {
        return randomBytes(32).toString("base64url");
    }
    hashToken(token) {
        return createHmac("sha256", env.JWT_SECRET).update(token).digest("hex");
    }
    expiresAt(now = new Date()) {
        const match = /^(\d+)([mhd])$/.exec(env.JWT_EXPIRES_IN.trim().toLowerCase());
        if (!match)
            throw new Error("JWT_EXPIRES_IN must use m, h, or d units.");
        const amount = Number(match[1]);
        const unitMs = match[2] === "m"
            ? 60_000
            : match[2] === "h"
                ? 3_600_000
                : 86_400_000;
        return new Date(now.getTime() + amount * unitMs);
    }
}
//# sourceMappingURL=SessionTokenService.js.map