/**
 * -----------------------------------------------------------------------------
 * File: validate-request.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Validates request body, params and query using Zod schemas.
 * -----------------------------------------------------------------------------
 */
import type { RequestHandler } from "express";
import { ZodTypeAny } from "zod";
export interface ValidationSchemas {
    body?: ZodTypeAny;
    params?: ZodTypeAny;
    query?: ZodTypeAny;
}
export declare function validateRequest(schemas: ValidationSchemas): RequestHandler;
