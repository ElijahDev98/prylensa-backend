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
import * as cheerio from "cheerio";
export class JumiaSearchParser {
    /**
     * Parses the Jumia search HTML fragment.
     */
    parse(html) {
        const $ = cheerio.load(html);
        const productContainer = $("div[data-products-spon]").first();
        if (productContainer.length === 0) {
            throw new Error("Unable to locate embedded Jumia product metadata.");
        }
        const rawProducts = productContainer.attr("data-products-spon");
        if (!rawProducts) {
            throw new Error("Embedded Jumia product metadata is empty.");
        }
        let products;
        try {
            products = JSON.parse(rawProducts);
        }
        catch (error) {
            throw new Error(`Failed to deserialize Jumia product metadata: ${error instanceof Error ? error.message : "Unknown parsing error"}`);
        }
        return {
            products,
        };
    }
}
//# sourceMappingURL=jumia-search.parser.js.map