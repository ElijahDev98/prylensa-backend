/**
 * -----------------------------------------------------------------------------
 * File: AuthController.ts
 * Module: Auth
 *
 * Purpose:
 * Handles auth HTTP requests.
 * -----------------------------------------------------------------------------
 */
import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import type { GuestSignInRequestDto } from "../dto/GuestSignInDto.js";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signInGuest(req: Request<unknown, unknown, GuestSignInRequestDto>, res: Response, next: NextFunction): Promise<void>;
    signOut(req: Request, res: Response, next: NextFunction): Promise<void>;
}
