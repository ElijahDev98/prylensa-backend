/**
 * -----------------------------------------------------------------------------
 * File: AuthService.ts
 * Module: Auth
 *
 * Purpose:
 * Provides lightweight database-backed guest sign-in.
 * -----------------------------------------------------------------------------
 */
import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import { prisma } from "../../../shared/database/index.js";
export class AuthService {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async signInGuest(email) {
        const suppliedEmail = email?.trim().toLowerCase();
        const normalizedEmail = this.guestEmail(suppliedEmail);
        const salt = randomBytes(16).toString("hex");
        const passwordHash = `${salt}:${scryptSync(randomUUID(), salt, 64).toString("hex")}`;
        const createData = {
            firstName: "Guest",
            lastName: "User",
            email: normalizedEmail,
            password: passwordHash,
            isActive: true,
            isVerified: false,
        };
        const user = await prisma.user.create({ data: createData });
        const accessToken = this.tokenService.createToken();
        const expiresAt = this.tokenService.expiresAt();
        await prisma.authSession.create({
            data: {
                userId: user.id,
                tokenHash: this.tokenService.hashToken(accessToken),
                expiresAt,
            },
        });
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
            accessToken,
            expiresAt: expiresAt.toISOString(),
        };
    }
    async signOut(sessionId) {
        await prisma.authSession.updateMany({
            where: { id: sessionId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    guestEmail(suppliedEmail) {
        const id = randomUUID();
        if (!suppliedEmail || !suppliedEmail.includes("@")) {
            return `guest+${id}@prylensa.local`;
        }
        const [localPart, domain] = suppliedEmail.split("@", 2);
        const safeLocalPart = (localPart || "guest").replace(/[^a-z0-9._-]/g, "");
        return `${safeLocalPart}+guest-${id}@${domain}`;
    }
}
//# sourceMappingURL=AuthService.js.map