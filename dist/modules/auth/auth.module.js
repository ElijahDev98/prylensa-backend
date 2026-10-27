/**
 * -----------------------------------------------------------------------------
 * File: auth.module.ts
 * Module: Auth
 *
 * Purpose:
 * Composes Auth dependencies.
 * -----------------------------------------------------------------------------
 */
import { AuthController } from "./controllers/AuthController.js";
import { AuthService } from "./services/AuthService.js";
import { SessionTokenService } from "./services/SessionTokenService.js";
const service = new AuthService(new SessionTokenService());
export const authController = new AuthController(service);
//# sourceMappingURL=auth.module.js.map