/**
 * -----------------------------------------------------------------------------
 * File: validation-error.ts
 * Project: Priciq Backend
 * Layer: Shared
 * -----------------------------------------------------------------------------
 */
import { HTTP_STATUS } from "../constants/http-status.js";
import { AppError } from "./app-error.js";
export class ValidationError extends AppError {
    constructor(message = "Validation failed.", details) {
        super({
            statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
            message,
            code: "VALIDATION_ERROR",
            details,
        });
    }
}
//# sourceMappingURL=validation-error.js.map