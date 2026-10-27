import type { NextFunction, Request, Response } from "express";

import type { AlertService } from "../services/AlertService.js";
import type { AlertRuleType } from "../dto/AlertDto.js";
import { authenticatedUserId } from "../../../app/middlewares/auth.middleware.js";
import { notificationBroker } from "../services/NotificationBroker.js";

export class AlertController {
  constructor(private readonly service: AlertService) {}

  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json({ success: true, data: await this.service.listRules(this.userId(req)) });
    } catch (error) { next(error); }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.service.createRule({
        userId: authenticatedUserId(req),
        name: typeof req.body.name === "string" ? req.body.name : undefined,
        productQuery: String(req.body.productQuery ?? ""),
        type: String(req.body.type ?? "price-drop") as AlertRuleType,
        threshold: Number(req.body.threshold ?? 0),
      });
      res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.service.updateRule(this.userId(req), String(req.params.id), {
        name: typeof req.body.name === "string" ? req.body.name : undefined,
        productQuery: typeof req.body.productQuery === "string" ? req.body.productQuery : undefined,
        type: typeof req.body.type === "string" ? req.body.type as AlertRuleType : undefined,
        threshold: req.body.threshold === undefined ? undefined : Number(req.body.threshold),
        enabled: typeof req.body.enabled === "boolean" ? req.body.enabled : undefined,
      });
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  }

  public async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.deleteRule(this.userId(req), String(req.params.id));
      res.status(204).send();
    } catch (error) { next(error); }
  }

  public async evaluate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const triggered = await this.service.evaluateActiveRules(this.userId(req));
      res.status(200).json({ success: true, data: { triggered } });
    } catch (error) { next(error); }
  }

  public async notifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = Number(req.query.limit ?? 20);
      const data = await this.service.listNotifications(this.userId(req), Number.isFinite(limit) ? limit : 20);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  }

  public async markRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.markNotificationRead(this.userId(req), String(req.params.id));
      res.status(204).send();
    } catch (error) { next(error); }
  }

  public stream(req: Request, res: Response): void {
    const userId = this.userId(req);
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    res.write("event: connected\ndata: {}\n\n");

    const unsubscribe = notificationBroker.subscribe(userId, (notification) => {
      res.write(`event: notification\ndata: ${JSON.stringify(notification)}\n\n`);
    });
    const heartbeat = setInterval(() => res.write(": heartbeat\n\n"), 25_000);
    heartbeat.unref();

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  }

  private userId(req: Request): string {
    return authenticatedUserId(req);
  }
}
