/**
 * -----------------------------------------------------------------------------
 * Jumia Search Parser
 * -----------------------------------------------------------------------------
 *
 * Converts Jumia's HTML search fragment into strongly typed DTOs.
 *
 * Responsibilities:
 *  - Parse HTML
 *  - Extract embedded JSON
 *  - Deserialize JSON
 *  - Return provider DTOs
 *
 * No business logic belongs here.
 * -----------------------------------------------------------------------------
 */
import type { JumiaSearchResponseDto } from "../dto/jumia-search-response.dto.js";
export declare class JumiaSearchParser {
    /**
     * Parses the Jumia search HTML fragment.
     */
    parse(html: string): JumiaSearchResponseDto;
}
