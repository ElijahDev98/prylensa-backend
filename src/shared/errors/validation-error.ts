/**
 * -----------------------------------------------------------------------------
 * File: validation-error.ts
 * Project: Prylensa Backend
 * Layer: Shared
 * -----------------------------------------------------------------------------
 */

import { HTTP_STATUS } from "../constants/http-status.js";
import { AppError } from "./app-error.js";

export class ValidationError extends AppError {
  constructor(message = "Validation failed.", details?: unknown) {
    super({
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message,
      code: "VALIDATION_ERROR",
      details,
    });
  }
}
