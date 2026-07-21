/**
 * -----------------------------------------------------------------------------
 * File: api-response.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Provides standardized success and error API response helpers.
 * -----------------------------------------------------------------------------
 */
export class ApiResponse {
    static success(res, statusCode, message, data) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    static error(res, statusCode, message, error) {
        return res.status(statusCode).json({
            success: false,
            message,
            error,
        });
    }
}
//# sourceMappingURL=api-response.js.map