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
export declare const SLOT_CONFIG: {
    /**
     * Base URL of the Slot REST API.
     */
    readonly BASE_URL: "https://api-prod.slot.ng";
    /**
     * HTTP client configuration.
     */
    readonly HTTP: {
        /**
         * Maximum request timeout.
         */
        readonly TIMEOUT: 10000;
        /**
         * Match the behaviour of the official Slot frontend.
         */
        readonly WITH_CREDENTIALS: true;
        /**
         * Default headers.
         */
        readonly HEADERS: {
            readonly Accept: "application/json, text/plain, */*";
            readonly Origin: "https://slot.ng";
            readonly Referer: "https://slot.ng/";
            readonly "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36";
        };
    };
    /**
     * Slot visibility identifiers.
     */
    readonly VISIBILITY: {
        /**
         * Used by catalogue/product endpoints.
         */
        readonly CATALOG: "01K0EQ4RY4WFZEKJ0XFW3EDY57";
        /**
         * Used by the product search endpoint.
         */
        readonly SEARCH: "01K0EQ4RYA5553TH5RAY654EDU";
    };
    /**
     * Product search configuration.
     */
    readonly SEARCH: {
        readonly ENDPOINT: "/api/v1/product-search";
        readonly DEFAULT_PAGE: 1;
        readonly DEFAULT_PAGE_SIZE: 6;
    };
};
