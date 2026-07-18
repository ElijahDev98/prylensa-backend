/**
 * -----------------------------------------------------------------------------
 * File: logger.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Centralized logging utility.
 * -----------------------------------------------------------------------------
 */

export class Logger {
  info(message: string, ...meta: unknown[]): void {
    console.info(`[INFO] ${message}`, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...meta);
  }

  error(message: string, ...meta: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, ...meta);
    }
  }
}

export const logger = new Logger();
