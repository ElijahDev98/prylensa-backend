import type { Offer } from "../models/Offer.js";
import type { AiProductAnalysisItemDto } from "../../ai/dto/AiAnalysisDto.js";
/**
 * -----------------------------------------------------------------------------
 * Search Response DTO
 * -----------------------------------------------------------------------------
 *
 * Represents a grouped product returned from the marketplace search endpoint.
 *
 * This DTO forms the public API contract exposed to frontend clients.
 *
 * Internal business models should never be returned directly from controllers.
 * -----------------------------------------------------------------------------
 */
export interface SearchResponseDto {
    /**
     * Unique comparison key identifying the grouped product.
     */
    comparisonKey: string;
    /**
     * Marketplace offers belonging to the same product.
     */
    offers: Offer[];
    /**
     * Number of marketplace offers within the group.
     */
    offerCount: number;
    /**
     * AI analysis produced from the grouped marketplace offers.
     */
    aiAnalysis?: AiProductAnalysisItemDto;
}
