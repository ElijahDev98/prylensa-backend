/**
 * Slot Marketplace API Configuration
 *
 * Centralizes all configuration values required to communicate
 * with the Slot REST API.
 *
 * Keeping these values in one place makes the provider easier
 * to maintain and prevents hardcoded strings throughout the codebase.
 */
export const SLOT_CONFIG = {
  /**
   * Base URL of the Slot REST API.
   *
   * Example:
   * https://api-prod.slot.ng/api/v1/products
   */
  BASE_URL: "https://api-prod.slot.ng",

  /**
   * Product search endpoint.
   *
   * Supports query parameters such as:
   * - q
   * - page
   * - per_page
   * - sort (optional)
   * - min_price (optional)
   * - max_price (optional)
   */
  SEARCH_ENDPOINT: "/api/v1/products",

  /**
   * Maximum time (in milliseconds) to wait
   * for a response before the request is aborted.
   */
  REQUEST_TIMEOUT: 10_000,

  /**
   * Default page number used when none is supplied.
   */
  DEFAULT_PAGE: 1,

  /**
   * Default number of products returned per request.
   *
   * This matches the default value observed from
   * the Slot API.
   */
  DEFAULT_PAGE_SIZE: 20,
} as const;
