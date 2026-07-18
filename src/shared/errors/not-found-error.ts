/**
 * -----------------------------------------------------------------------------
 * File: not-found-error.ts
 * Project: Priciq Backend
 * Layer: Shared
 * -----------------------------------------------------------------------------
 */

import { HTTP_STATUS } from "../constants/http-status.js";
import { AppError } from "./app-error.js";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found.") {
    super({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message,
      code: "NOT_FOUND",
    });
  }
}
