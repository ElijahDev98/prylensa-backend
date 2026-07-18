/**
 * ================================================================
 * File: app.ts
 * Layer: Application
 *
 * Purpose:
 *   Configures the Express application.
 *
 * Responsibilities:
 *   - Create the Express application
 *   - Register global middleware
 *   - Register application routes
 *   - Handle unknown routes
 *   - Register the global error handler
 *
 * This file should NEVER:
 *   - Start the HTTP server
 *   - Access the database
 *   - Contain business logic
 * ================================================================
 */

import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import morgan from "morgan";

import apiRoutes from "./routes/index.js";

// Create the Express application.
const app = express();

/**
 * ================================================================
 * Global Middleware
 * ================================================================
 */

// Adds common HTTP security headers.
app.use(helmet());

// Enables Cross-Origin Resource Sharing.
app.use(cors());

// Parses incoming JSON request bodies.
app.use(express.json());

// Parses URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));

// Logs incoming HTTP requests.
app.use(morgan("dev"));

/**
 * ================================================================
 * API Routes
 * ================================================================
 */
app.use("/api/v1", apiRoutes);

/**
 * ================================================================
 * 404 Handler
 * ================================================================
 * Handles requests for routes that do not exist.
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' was not found.`,
    data: null,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  });
});

/**
 * ================================================================
 * Global Error Handler
 * ================================================================
 * This will be expanded in Milestone 0.3.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      data: null,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
  },
);

export default app;
