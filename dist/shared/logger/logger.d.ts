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
export declare class Logger {
    info(message: string, ...meta: unknown[]): void;
    warn(message: string, ...meta: unknown[]): void;
    error(message: string, ...meta: unknown[]): void;
    debug(message: string, ...meta: unknown[]): void;
}
export declare const logger: Logger;
