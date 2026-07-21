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
 * - Parse Jumia's HTML fragment.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import axios, { AxiosError } from "axios";
import { JUMIA_CONFIG } from "./config/jumia.config.js";
import { JumiaSearchParser } from "./parser/jumia-search.parser.js";
import { JumiaOfferMapper } from "./mapper/jumia-offer.mapper.js";
export class JumiaProvider {
    name = "Jumia";
    client;
    parser;
    mapper;
    constructor() {
        this.client = axios.create({
            baseURL: JUMIA_CONFIG.BASE_URL,
            timeout: JUMIA_CONFIG.HTTP.TIMEOUT,
            // withCredentials: false,
            headers: JUMIA_CONFIG.HTTP.HEADERS,
        });
        this.parser = new JumiaSearchParser();
        this.mapper = new JumiaOfferMapper();
    }
    /**
     * Searches products on Jumia.
     */
    async search(query) {
        try {
            console.log("[Jumia] Searching:", query);
            const response = await this.client.get(JUMIA_CONFIG.SEARCH.ENDPOINT, {
                params: {
                    query,
                    page: JUMIA_CONFIG.SEARCH.DEFAULT_PAGE,
                    numberItems: JUMIA_CONFIG.SEARCH.DEFAULT_PAGE_SIZE,
                    viewType: JUMIA_CONFIG.SEARCH.DEFAULT_VIEW,
                    returnOverride: `/catalog/?q=${encodeURIComponent(query)}`,
                    lang: JUMIA_CONFIG.SEARCH.DEFAULT_LANGUAGE,
                },
                responseType: "text",
            });
            console.log("Status:", response.status);
            console.log("Status Text:", response.statusText);
            console.log("Headers:", response.headers);
            console.log("Data Length:", response.data.length);
            console.log("Data:", JSON.stringify(response.data));
            console.log("========== RESPONSE START ==========");
            console.log(response.data);
            console.log("========== RESPONSE END ==========");
            const searchResult = this.parser.parse(response.data);
            console.log("[Jumia] Parsed Products:", searchResult.products.length);
            const offers = this.mapper.mapMany(searchResult.products);
            console.log("[Jumia] Mapped Offers:", offers.length);
            if (offers.length > 0) {
                console.log("[Jumia] First Offer:", offers[0]);
            }
            return offers;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Jumia search failed (${error.response?.status ?? "Unknown"}): ${error.message}`);
            }
            throw new Error(`Unexpected error while searching Jumia: ${error instanceof Error ? error.message : String(error)}`);
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