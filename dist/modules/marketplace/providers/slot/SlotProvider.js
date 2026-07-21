/**
 * -----------------------------------------------------------------------------
 * File: SlotProvider.ts
 * Module: Marketplace
 *
 * Description:
 * Concrete implementation of the MarketplaceProvider interface for Slot.
 *
 * Responsibilities:
 * - Execute product searches against the Slot API.
 * - Convert provider DTOs into Offer domain models.
 * - Never expose provider DTOs outside this layer.
 * -----------------------------------------------------------------------------
 */
import axios, { AxiosError } from "axios";
import { SLOT_CONFIG } from "./config/slot.config.js";
import { SlotOfferMapper } from "./mappers/SlotOfferMapper.js";
export class SlotProvider {
    name = "Slot";
    client;
    constructor() {
        this.client = axios.create({
            baseURL: SLOT_CONFIG.BASE_URL,
            timeout: SLOT_CONFIG.HTTP.TIMEOUT,
            withCredentials: SLOT_CONFIG.HTTP.WITH_CREDENTIALS,
        });
    }
    /**
     * Builds Slot request headers.
     */
    buildHeaders(visibility) {
        return {
            ...SLOT_CONFIG.HTTP.HEADERS,
            "X-Visibility": visibility,
        };
    }
    /**
     * Searches products on Slot.
     */
    async search(query) {
        const request = {
            q: query,
            page: SLOT_CONFIG.SEARCH.DEFAULT_PAGE,
            per_page: SLOT_CONFIG.SEARCH.DEFAULT_PAGE_SIZE,
        };
        try {
            const response = await this.client.get(SLOT_CONFIG.SEARCH.ENDPOINT, {
                params: request,
                headers: this.buildHeaders(SLOT_CONFIG.VISIBILITY.SEARCH),
            });
            return SlotOfferMapper.toOffers(response.data.data ?? []);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Slot search failed (${error.response?.status ?? "Unknown"}): ${error.response?.data?.message ?? error.message}`);
            }
            throw new Error(`Unexpected error while searching Slot: ${error instanceof Error ? error.message : String(error)}`);
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
//# sourceMappingURL=SlotProvider.js.map