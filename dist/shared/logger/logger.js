/**
 * -----------------------------------------------------------------------------
 * File: logger.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Centralized logging utility.
 * -----------------------------------------------------------------------------
 */
export class Logger {
    info(message, ...meta) {
        console.info(`[INFO] ${message}`, ...meta);
    }
    warn(message, ...meta) {
        console.warn(`[WARN] ${message}`, ...meta);
    }
    error(message, ...meta) {
        console.error(`[ERROR] ${message}`, ...meta);
    }
    debug(message, ...meta) {
        if (process.env.NODE_ENV === "development") {
            console.debug(`[DEBUG] ${message}`, ...meta);
        }
    }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map