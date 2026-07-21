/**
 * -----------------------------------------------------------------------------
 * File: not-found-error.ts
 * Project: Priciq Backend
 * Layer: Shared
 * -----------------------------------------------------------------------------
 */
import { AppError } from "./app-error.js";
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
