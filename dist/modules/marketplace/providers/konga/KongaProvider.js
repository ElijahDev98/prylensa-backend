/**
 * -----------------------------------------------------------------------------
 * File: KongaProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Konga.
 *
 * Responsibilities:
 * - Communicate with the Konga Search API.
 * - Execute product searches.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import axios, { AxiosError } from "axios";
import { KONGA_CONFIG } from "./config/konga.config.js";
import { KongaOfferMapper } from "./mappers/KongaOfferMapper.js";
export class KongaProvider {
    /**
     * Marketplace display name.
     */
    name = "Konga";
    /**
     * HTTP client.
     */
    client;
    constructor() {
        this.client = axios.create({
            baseURL: KONGA_CONFIG.BASE_URL,
            timeout: KONGA_CONFIG.REQUEST_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "kss-api-key": KONGA_CONFIG.API_KEY,
            },
        });
    }
    /**
     * Searches products on Konga.
     */
    async search(query) {
        const request = {
            name: KONGA_CONFIG.SEARCH_INDEX,
            q: query,
            page: KONGA_CONFIG.DEFAULT_PAGE,
            hitPerPage: KONGA_CONFIG.DEFAULT_PAGE_SIZE,
            facet_by: KONGA_CONFIG.DEFAULT_FACET,
        };
        try {
            const response = await this.client.post(KONGA_CONFIG.SEARCH_ENDPOINT, request);
            const products = response.data.data.hits ?? [];
            return KongaOfferMapper.toOffers(products);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response?.status ?? "Unknown";
                const message = error.response?.data?.message ??
                    error.message;
                throw new Error(`Konga search failed (${status}): ${message}`);
            }
            throw new Error(`Unexpected error while searching Konga: ${error instanceof Error ? error.message : String(error)}`);
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
//# sourceMappingURL=KongaProvider.js.map