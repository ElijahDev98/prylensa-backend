/**
 * -----------------------------------------------------------------------------
 * File: slot.config.ts
 * Module: Marketplace / Slot
 *
 * Description:
 * Centralized configuration for the Slot marketplace integration.
 *
 * Responsibilities:
 * - API endpoints
 * - HTTP configuration
 * - Search defaults
 * - Provider-specific request headers
 * - Marketplace visibility identifiers
 *
 * Notes:
 * Slot uses different visibility identifiers depending on the resource being
 * accessed. These values were identified by reverse engineering the official
 * Slot frontend.
 * -----------------------------------------------------------------------------
 */
import { MARKETPLACE_OFFER_TARGET } from "../../../constants/marketplace-search.constants.js";
export const SLOT_CONFIG = {
    /**
     * Base URL of the Slot REST API.
     */
    BASE_URL: "https://api-prod.slot.ng",
    /**
     * HTTP client configuration.
     */
    HTTP: {
        /**
         * Match the behaviour of the official Slot frontend.
         */
        WITH_CREDENTIALS: true,
        /**
         * Default headers.
         */
        HEADERS: {
            Accept: "application/json, text/plain, */*",
            Origin: "https://slot.ng",
            Referer: "https://slot.ng/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
        },
    },
    /**
     * Slot visibility identifiers.
     */
    VISIBILITY: {
        /**
         * Used by catalogue/product endpoints.
         */
        CATALOG: "01K0EQ4RY4WFZEKJ0XFW3EDY57",
        /**
         * Used by the product search endpoint.
         */
        SEARCH: "01K0EQ4RYA5553TH5RAY654EDU",
    },
    /**
     * Product search configuration.
     */
    SEARCH: {
        ENDPOINT: "/api/v1/product-search",
        DEFAULT_PAGE: 1,
        DEFAULT_PAGE_SIZE: MARKETPLACE_OFFER_TARGET,
    },
};
//# sourceMappingURL=slot.config.js.map