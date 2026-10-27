/**
 * -----------------------------------------------------------------------------
 * File: JumiaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Jumia.
 *
 * Responsibilities:
 * - Execute product searches against Jumia.
 * - Download the fully rendered HTML using Playwright.
 * - Parse the marketplace application state.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import { MARKETPLACE_OFFER_TARGET } from "../../constants/marketplace-search.constants.js";
import { JumiaScraper } from "./scraper/JumiaScraper.js";
import { JumiaDomParser } from "./parser/JumiaDomParser.js";
import { JumiaOfferMapper } from "./mapper/jumia-offer.mapper.js";
export class JumiaProvider {
    name = "Jumia";
    scraper;
    parser;
    mapper;
    constructor() {
        this.scraper = new JumiaScraper();
        this.parser = new JumiaDomParser();
        this.mapper = new JumiaOfferMapper();
    }
    /**
     * Searches products on Jumia.
     */
    async search(query) {
        // console.log(`[Jumia] Searching: ${query}`);
        try {
            const html = await this.scraper.scrape(query);
            // console.log(
            //   `[Jumia] Downloaded HTML (${html.length.toLocaleString()} bytes)`,
            // );
            const store = this.parser.parse(html);
            // console.log(
            //   `[Jumia] Parsed Products: ${store.products.length.toLocaleString()}`,
            // );
            const offers = this.mapper.mapMany(store.products);
            /*
            // console.log(`[Jumia] Mapped Offers: ${offers.length.toLocaleString()}`);
      
            if (offers.length > 0) {
              // console.log("[Jumia] First Offer:", offers[0]);
            }
            */
            return offers.slice(0, MARKETPLACE_OFFER_TARGET);
        }
        catch (error) {
            throw new Error(`Jumia search failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Retrieves a product by its marketplace identifier.
     *
     * Will be implemented in a later milestone.
     */
    async getProduct(_productId) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=JumiaProvider.js.map