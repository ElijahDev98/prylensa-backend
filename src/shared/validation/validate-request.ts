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

import type { RequestHandler } from "express";
import { ZodTypeAny, ZodError } from "zod";

import { ValidationError } from "../errors/validation-error.js";

export interface ValidationSchemas {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}

export function validateRequest(schemas: ValidationSchemas): RequestHandler {
  return (req, _res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body) as typeof req.body;
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as typeof req.params;
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as typeof req.query;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ValidationError("Request validation failed.", error.flatten()),
        );
      }

      next(error);
    }
  };
}
