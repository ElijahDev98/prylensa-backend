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

export const JUMIA_CONFIG = {
  /**
   * Base Jumia URL.
   */
  BASE_URL: "https://www.jumia.com.ng",

  /**
   * HTTP configuration.
   */
  HTTP: {
    TIMEOUT: 15000,

    HEADERS: {
      Accept: "text/html, */*; q=0.01",

      "Accept-Language": "en-US,en;q=0.9",

      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",

      Referer: "https://www.jumia.com.ng/",
    },
  },

  /**
   * Search configuration.
   */
  SEARCH: {
    ENDPOINT:
      "/fragment/sp/products/provider/mirakl/catalog-page-types/search/",

    DEFAULT_PAGE: 1,

    DEFAULT_PAGE_SIZE: 12,

    DEFAULT_VIEW: "grid",

    DEFAULT_LANGUAGE: "en",
  },
} as const;
