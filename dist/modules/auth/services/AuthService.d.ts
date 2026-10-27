/**
 * -----------------------------------------------------------------------------
 * File: AuthService.ts
 * Module: Auth
 *
 * Purpose:
 * Provides lightweight database-backed guest sign-in.
 * -----------------------------------------------------------------------------
 */
import type { GuestSignInResponseDto } from "../dto/GuestSignInDto.js";
import type { SessionTokenService } from "./SessionTokenService.js";
export declare class AuthService {
    private readonly tokenService;
    constructor(tokenService: SessionTokenService);
    signInGuest(email?: string): Promise<GuestSignInResponseDto>;
    signOut(sessionId: string): Promise<void>;
    private guestEmail;
}
