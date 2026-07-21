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
      Accept: "text/html,*/*;q=0.01",

      "Accept-Language": "en-US,en;q=0.9",

      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0",

      Referer:
        "https://www.jumia.com.ng/assets_he/js/fetch-lp.worker.676e43b1.js",

      "X-Request-Type": "async",

      "X-Requested-With": "XMLHttpRequest",

      Connection: "keep-alive",

      "Cache-Control": "no-cache",

      Pragma: "no-cache",

      "Accept-Encoding": "gzip, deflate, br",
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
