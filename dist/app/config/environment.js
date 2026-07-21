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