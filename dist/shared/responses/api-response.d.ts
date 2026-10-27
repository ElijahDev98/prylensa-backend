/**
 * -----------------------------------------------------------------------------
 * File: api-response.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Provides standardized success and error API response helpers.
 * -----------------------------------------------------------------------------
 */
import type { Response } from "express";
export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}
export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: unknown;
}
export declare class ApiResponse {
    static success<T>(res: Response, statusCode: number, message: string, data: T): Response<ApiSuccessResponse<T>>;
    static error(res: Response, statusCode: number, message: string, error?: unknown): Response<ApiErrorResponse>;
}
