/**
 * ================================================================
 * File: environment.ts
 * Layer: Application Configuration
 *
 * Purpose:
 *   Loads, validates and exposes all application configuration.
 *
 * This module serves as the single source of truth for all
 * environment variables used throughout the application.
 *
 * No other file should access process.env directly.
 *
 * Responsibilities:
 *   - Load environment variables
 *   - Validate required configuration
 *   - Export a strongly typed configuration object
 *
 * ================================================================
 */
/**
 * Strongly typed application configuration.
 */
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    LOG_LEVEL: "error" | "warn" | "info" | "debug";
};
