/**
 * -----------------------------------------------------------------------------
 * File: api-response.ts
 * Project: Priciq Backend
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

export class ApiResponse {
  public static success<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T,
  ): Response<ApiSuccessResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  public static error(
    res: Response,
    statusCode: number,
    message: string,
    error?: unknown,
  ): Response<ApiErrorResponse> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }
}
