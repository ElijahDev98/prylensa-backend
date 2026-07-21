/**
 * ================================================================
 * File: server.ts
 * Layer: Application
 * Purpose:
 *   Manages the lifecycle of the HTTP server.
 *
 * Responsibilities:
 *   - Create the HTTP server
 *   - Start listening on the configured port
 *   - Handle graceful shutdown
 *
 * This file intentionally does NOT:
 *   - Configure Express
 *   - Register middleware
 *   - Define routes
 * ================================================================
 */
/**
 * Starts the HTTP server.
 */
export declare const startServer: () => Promise<void>;
