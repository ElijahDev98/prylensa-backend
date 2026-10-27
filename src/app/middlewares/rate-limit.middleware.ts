import type { NextFunction, Request, Response } from "express";

import { env } from "../config/environment.js";

interface RateEntry { count: number; resetsAt: number }
const clients = new Map<string, RateEntry>();

export function rateLimit(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const current = clients.get(key);
  const entry = !current || current.resetsAt <= now
    ? { count: 0, resetsAt: now + env.RATE_LIMIT_WINDOW_MS }
    : current;
  entry.count += 1;
  clients.set(key, entry);

  res.setHeader("RateLimit-Limit", env.RATE_LIMIT_MAX_REQUESTS);
  res.setHeader("RateLimit-Remaining", Math.max(env.RATE_LIMIT_MAX_REQUESTS - entry.count, 0));
  res.setHeader("RateLimit-Reset", Math.ceil(entry.resetsAt / 1000));
  if (entry.count > env.RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({ success: false, message: "Too many requests. Please retry shortly." });
    return;
  }
  next();
}
