/**
 * Handles HTTP requests related to product comparison.
 *
 * The controller is intentionally thin. Its responsibility is to
 * validate the incoming request, delegate work to the
 * ComparisonService and return an HTTP response.
 */
export class ComparisonController {
    comparisonService;
    /**
     * Creates a new ComparisonController.
     *
     * @param comparisonService Application service responsible for
     * comparison workflow.
     */
    constructor(comparisonService) {
        this.comparisonService = comparisonService;
    }
    /**
     * Searches for a product across all registered providers.
     *
     * GET /api/comparisons?query=iphone+15
     */
    compare = async (request, response, next) => {
        try {
            const query = String(request.query.query ?? "").trim();
            if (!query) {
                response.status(400).json({
                    message: "Query parameter is required.",
                });
                return;
            }
            const offers = await this.comparisonService.compare(query);
            response.status(200).json(offers);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=comparison.controller.js.map