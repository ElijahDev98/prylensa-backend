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
import dotenv from "dotenv";
import { z } from "zod";
// Load environment variables from the .env file.
dotenv.config();
/**
 * Validation schema for application environment variables.
 */
const environmentSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z.coerce.number().int().positive().default(5000),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: z.string().default("7d"),
    LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
    AI_SERVICE_URL: z
        .string()
        .url()
        .default("http://localhost:8001/api/v1"),
    INTERNAL_AI_API_KEY: z
        .string()
        .min(16)
        .default("prylensa-local-internal-ai-key"),
    MARKETPLACE_CACHE_TTL_MS: z.coerce.number().int().min(0).default(120000),
    MONITORING_INTERVAL_MS: z.coerce.number().int().min(60000).default(900000),
    CORS_ORIGINS: z.string().default("http://localhost:5173,http://127.0.0.1:5173"),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(180),
});
/**
 * Parse and validate all environment variables.
 */
const parsedEnvironment = environmentSchema.safeParse(process.env);
if (!parsedEnvironment.success) {
    console.error("❌ Invalid environment configuration.", parsedEnvironment.error.format());
    process.exit(1);
}
/**
 * Strongly typed application configuration.
 */
export const env = parsedEnvironment.data;
//# sourceMappingURL=environment.js.map