/**
 * -----------------------------------------------------------------------------
 * File: validate-request.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Validates request body, params and query using Zod schemas.
 * -----------------------------------------------------------------------------
 */
import { ZodError } from "zod";
import { ValidationError } from "../errors/validation-error.js";
export function validateRequest(schemas) {
    return (req, _res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return next(new ValidationError("Request validation failed.", error.flatten()));
            }
            next(error);
        }
    };
}
//# sourceMappingURL=validate-request.js.map