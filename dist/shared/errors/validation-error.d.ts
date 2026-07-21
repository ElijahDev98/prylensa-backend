/**
 * -----------------------------------------------------------------------------
 * File: validation-error.ts
 * Project: Priciq Backend
 * Layer: Shared
 * -----------------------------------------------------------------------------
 */
import { AppError } from "./app-error.js";
export declare class ValidationError extends AppError {
    constructor(message?: string, details?: unknown);
}
