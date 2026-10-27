import type { NextFunction, Request, Response } from "express";
export declare function requireInternalApiKey(req: Request, res: Response, next: NextFunction): void;
export declare function requireAuthOrInternalApiKey(req: Request, res: Response, next: NextFunction): void;
