/**
 * -----------------------------------------------------------------------------
 * File: konga.config.ts
 * Module: Marketplace / Konga Provider
 *
 * Central configuration for the Konga provider.
 * -----------------------------------------------------------------------------
 */

export const KONGA_CONFIG = {
  BASE_URL: "https://kss.igbimo.com",

  SEARCH_ENDPOINT: "/search",

  SEARCH_INDEX: "catalog_store_konga_ranking",

  DEFAULT_PAGE: 1,

  DEFAULT_PAGE_SIZE: 5,

  DEFAULT_FACET: "attributes.brand",

  REQUEST_TIMEOUT: 10000,

  API_KEY: "kss_pub_BlDPgUB4XUJwJgh7oyliGBFASQLAXR1i4",
} as const;
