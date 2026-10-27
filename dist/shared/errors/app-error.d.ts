/**
 * -----------------------------------------------------------------------------
 * File: app-error.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Base application error used throughout the backend.
 * -----------------------------------------------------------------------------
 */
export interface AppErrorOptions {
    statusCode: number;
    message: string;
    code?: string;
    details?: unknown;
}
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly details?: unknown;
    readonly isOperational: boolean;
    constructor(options: AppErrorOptions);
}
