/**
 * -----------------------------------------------------------------------------
 * File: jumia.config.ts
 * Module: Marketplace
 *
 * Description:
 * Central configuration for the Jumia marketplace provider.
 *
 * Responsibilities:
 * - Store Jumia endpoint configuration.
 * - Store HTTP defaults.
 * - Store search defaults.
 * - Avoid hard-coded values throughout the provider.
 * -----------------------------------------------------------------------------
 */
export declare const JUMIA_CONFIG: {
    /**
     * Base Jumia URL.
     */
    readonly BASE_URL: "https://www.jumia.com.ng";
    /**
     * HTTP configuration.
     */
    readonly HTTP: {
        readonly TIMEOUT: 15000;
        readonly HEADERS: {
            readonly Accept: "text/html,*/*;q=0.01";
            readonly "Accept-Language": "en-US,en;q=0.9";
            readonly "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0";
            readonly Referer: "https://www.jumia.com.ng/assets_he/js/fetch-lp.worker.676e43b1.js";
            readonly "X-Request-Type": "async";
            readonly "X-Requested-With": "XMLHttpRequest";
            readonly Connection: "keep-alive";
            readonly "Cache-Control": "no-cache";
            readonly Pragma: "no-cache";
            readonly "Accept-Encoding": "gzip, deflate, br";
        };
    };
    /**
     * Search configuration.
     */
    readonly SEARCH: {
        readonly ENDPOINT: "/fragment/sp/products/provider/mirakl/catalog-page-types/search/";
        readonly DEFAULT_PAGE: 1;
        readonly DEFAULT_PAGE_SIZE: 12;
        readonly DEFAULT_VIEW: "grid";
        readonly DEFAULT_LANGUAGE: "en";
    };
};
