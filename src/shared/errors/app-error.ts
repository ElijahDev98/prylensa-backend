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

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = "AppError";
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
