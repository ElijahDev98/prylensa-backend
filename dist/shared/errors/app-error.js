/**
 * -----------------------------------------------------------------------------
 * File: app-error.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Base application error used throughout the backend.
 * -----------------------------------------------------------------------------
 */
export class AppError extends Error {
    statusCode;
    code;
    details;
    isOperational;
    constructor(options) {
        super(options.message);
        this.name = "AppError";
        this.statusCode = options.statusCode;
        this.code = options.code;
        this.details = options.details;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=app-error.js.map