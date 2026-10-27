import type { NextFunction, Request, Response } from "express";
import type { AlertService } from "../services/AlertService.js";
export declare class AlertController {
    private readonly service;
    constructor(service: AlertService);
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    remove(req: Request, res: Response, next: NextFunction): Promise<void>;
    evaluate(req: Request, res: Response, next: NextFunction): Promise<void>;
    notifications(req: Request, res: Response, next: NextFunction): Promise<void>;
    markRead(req: Request, res: Response, next: NextFunction): Promise<void>;
    stream(req: Request, res: Response): void;
    private userId;
}
