/**
 * -----------------------------------------------------------------------------
 * File: app.ts
 * Project: Prylensa Backend
 * Layer: Application
 *
 * Purpose:
 * Configures the Express application, global middleware,
 * routes, 404 handler, and global error handler.
 * -----------------------------------------------------------------------------
 */

import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import { env } from "./config/environment.js";
import { NotFoundError } from "../shared/errors/not-found-error.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { rateLimit } from "./middlewares/rate-limit.middleware.js";

const app = express();

/**
 * ---------------------------------------------------------------------------
 * Global Middleware
 * ---------------------------------------------------------------------------
 */

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      const allowed = env.CORS_ORIGINS.split(",").map((value) => value.trim());
      callback(null, !origin || allowed.includes(origin));
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(rateLimit);

/**
 * ---------------------------------------------------------------------------
 * API Routes
 * ---------------------------------------------------------------------------
 */

// app.use("/api", routes);
app.use("/api/v1", routes);

/**
 * ---------------------------------------------------------------------------
 * 404 Handler
 * ---------------------------------------------------------------------------
 */

app.use((_req, _res, next) => {
  next(new NotFoundError("The requested resource was not found."));
});

/**
 * ---------------------------------------------------------------------------
 * Global Error Handler
 * ---------------------------------------------------------------------------
 */

app.use(errorMiddleware);

export default app;
