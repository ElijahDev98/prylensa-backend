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

import { ApiResponse } from "../../../shared/responses/api-response.js";

import type { AuthService } from "../services/AuthService.js";
import type { GuestSignInRequestDto } from "../dto/GuestSignInDto.js";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  public async signInGuest(
    req: Request<unknown, unknown, GuestSignInRequestDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await this.service.signInGuest(req.body.email);

      ApiResponse.success(res, 200, "Guest session created.", response);
    } catch (error) {
      next(error);
    }
  }

  public async signOut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.auth) throw new Error("Authenticated session is required.");
      await this.service.signOut(req.auth.sessionId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
