/**
 * -----------------------------------------------------------------------------
 * File: async-handler.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Wraps asynchronous Express route handlers and forwards
 * rejected promises to the global error middleware.
 * -----------------------------------------------------------------------------
 */
import type { Request, Response, NextFunction, RequestHandler } from "express";
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export declare function asyncHandler(handler: AsyncRequestHandler): RequestHandler;
export {};
