/**
 * -----------------------------------------------------------------------------
 * File: konga.config.ts
 * Module: Marketplace / Konga Provider
 *
 * Central configuration for the Konga provider.
 * -----------------------------------------------------------------------------
 */
import { MARKETPLACE_OFFER_TARGET } from "../../../constants/marketplace-search.constants.js";
export const KONGA_CONFIG = {
    BASE_URL: "https://kss.igbimo.com",
    SEARCH_ENDPOINT: "/search",
    SEARCH_INDEX: "catalog_store_konga_ranking",
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: MARKETPLACE_OFFER_TARGET,
    DEFAULT_FACET: "attributes.brand",
    API_KEY: "kss_pub_BlDPgUB4XUJwJgh7oyliGBFASQLAXR1i4",
};
//# sourceMappingURL=konga.config.js.map