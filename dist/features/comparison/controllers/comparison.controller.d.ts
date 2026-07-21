import type { Request, Response, NextFunction } from "express";
import { ComparisonService } from "../services/comparison.service.js";
/**
 * Handles HTTP requests related to product comparison.
 *
 * The controller is intentionally thin. Its responsibility is to
 * validate the incoming request, delegate work to the
 * ComparisonService and return an HTTP response.
 */
export declare class ComparisonController {
    private readonly comparisonService;
    /**
     * Creates a new ComparisonController.
     *
     * @param comparisonService Application service responsible for
     * comparison workflow.
     */
    constructor(comparisonService: ComparisonService);
    /**
     * Searches for a product across all registered providers.
     *
     * GET /api/comparisons?query=iphone+15
     */
    compare: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
