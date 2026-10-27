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

import http from "node:http";

import app from "./app.js";
import { env } from "./config/environment.js";
import { intelligenceMonitoringService } from "../modules/monitoring/monitoring.module.js";
import { prisma } from "../shared/database/index.js";

/**
 * Reference to the active HTTP server.
 */
let server: http.Server;

/**
 * Starts the HTTP server.
 */
export const startServer = async (): Promise<void> => {
  // Create an HTTP server using the configured Express application.
  server = http.createServer(app);

  // Start listening for incoming requests.
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(env.PORT, () => {
      server.off("error", reject);
    console.log("=".repeat(60));
    console.log("🚀 Prylensa Backend Started Successfully");
    console.log("=".repeat(60));
    console.log(`Environment : ${env.NODE_ENV}`);
    console.log(`Port        : ${env.PORT}`);
    console.log(`API         : http://localhost:${env.PORT}/api/v1`);
    console.log("=".repeat(60));
    intelligenceMonitoringService.start();
      resolve();
    });
  });

  // Listen for application termination signals.
  process.on("SIGINT", shutdown);

  process.on("SIGTERM", shutdown);
};

/**
 * Gracefully shuts down the HTTP server.
 *
 * Future enhancements:
 *   - Close Prisma connections
 *   - Disconnect Redis
 *   - Stop background workers
 *   - Flush log buffers
 */
const shutdown = (): void => {
  console.log("\nShutting down Prylensa Backend...");

  intelligenceMonitoringService.stop();

  server.close(() => {
    console.log("Server stopped successfully.");
    void prisma.$disconnect().finally(() => process.exit(0));
  });
};
