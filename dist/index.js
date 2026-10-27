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
import { startServer } from "./app/server.js";
/**
 * Starts the backend application.
 *
 * Any unrecoverable startup errors are logged and the
 * process exits with a failure status code.
 */
const bootstrap = async () => {
    try {
        await startServer();
    }
    catch (error) {
        console.error("Failed to start Prylensa Backend.", error);
        process.exit(1);
    }
};
// Execute the application bootstrap.
void bootstrap();
//# sourceMappingURL=index.js.map