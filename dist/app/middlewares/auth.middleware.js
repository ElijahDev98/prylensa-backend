import { prisma } from "../../shared/database/index.js";
import { AppError } from "../../shared/errors/app-error.js";
import { HTTP_STATUS } from "../../shared/constants/http-status.js";
import { SessionTokenService } from "../../modules/auth/services/SessionTokenService.js";
const tokenService = new SessionTokenService();
function unauthorized(message = "Authentication is required.") {
    return new AppError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        code: "UNAUTHORIZED",
        message,
    });
}
export async function requireAuth(req, _res, next) {
    try {
        const authorization = req.header("authorization")?.trim();
        if (!authorization?.startsWith("Bearer "))
            throw unauthorized();
        const token = authorization.slice("Bearer ".length).trim();
        if (!token)
            throw unauthorized();
        const session = await prisma.authSession.findUnique({
            where: { tokenHash: tokenService.hashToken(token) },
            include: { user: true },
        });
        if (!session ||
            session.revokedAt ||
            session.expiresAt <= new Date() ||
            !session.user.isActive ||
            session.user.deletedAt) {
            throw unauthorized("The session is invalid or has expired.");
        }
        req.auth = {
            userId: session.userId,
            sessionId: session.id,
            role: session.user.role,
        };
        next();
    }
    catch (error) {
        next(error);
    }
}
export function authenticatedUserId(req) {
    if (!req.auth)
        throw unauthorized();
    return req.auth.userId;
}
//# sourceMappingURL=auth.middleware.js.map