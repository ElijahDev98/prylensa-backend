/**
 * ================================================================
 * File: index.ts
 * Layer: Application Entry Point
 * Purpose:
 *   Entry point for the Prylensa backend application.
 *   Responsible for bootstrapping the server.
 *
 * This file should NEVER:
 *   - Configure Express
 *   - Register middleware
 *   - Register routes
 *   - Connect to the database
 *
 * Those responsibilities belong to other layers.
 * ================================================================
 */
/**
 * IMPORTANT:
 * Load environment variables BEFORE importing any application modules.
 */
import "dotenv/config";
