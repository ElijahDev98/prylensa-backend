/**
 * -----------------------------------------------------------------------------
 * File: error.middleware.ts
 * Project: Priciq Backend
 * Layer: Application
 *
 * Purpose:
 * Global Express error handler.
 * -----------------------------------------------------------------------------
 */
import { env } from "../config/environment.js";
import { HTTP_STATUS } from "../../shared/constants/http-status.js";
import { AppError } from "../../shared/errors/app-error.js";
export const errorMiddleware = (error, _req, res, _next) => {
    const isAppError = error instanceof AppError;
    const statusCode = isAppError
        ? error.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = isAppError ? error.message : "Internal server error.";
    return res.status(statusCode).json({
        success: false,
        message,
        code: isAppError ? error.code : "INTERNAL_SERVER_ERROR",
        details: isAppError ? error.details : undefined,
        stack: env.NODE_ENV === "development" ? error.stack : undefined,
    });
};
//# sourceMappingURL=error.middleware.js.map