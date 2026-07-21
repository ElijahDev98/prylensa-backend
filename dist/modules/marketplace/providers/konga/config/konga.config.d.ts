/**
 * -----------------------------------------------------------------------------
 * File: konga.config.ts
 * Module: Marketplace / Konga Provider
 *
 * Central configuration for the Konga provider.
 * -----------------------------------------------------------------------------
 */
export declare const KONGA_CONFIG: {
    readonly BASE_URL: "https://kss.igbimo.com";
    readonly SEARCH_ENDPOINT: "/search";
    readonly SEARCH_INDEX: "catalog_store_konga_ranking";
    readonly DEFAULT_PAGE: 1;
    readonly DEFAULT_PAGE_SIZE: 5;
    readonly DEFAULT_FACET: "attributes.brand";
    readonly REQUEST_TIMEOUT: 10000;
    readonly API_KEY: "kss_pub_BlDPgUB4XUJwJgh7oyliGBFASQLAXR1i4";
};
