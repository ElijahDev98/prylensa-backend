import type { NextFunction, Request, Response } from "express";
export declare function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void>;
export declare function authenticatedUserId(req: Request): string;
