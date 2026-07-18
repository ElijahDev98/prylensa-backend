import type { SearchResult } from "../models/search-result.model.js";

/**
 * Contract that every search provider must implement.
 *
 * Examples:
 * - JumiaProvider
 * - KongaProvider
 * - SlotProvider
 */
export interface SearchProvider {
  /**
   * Search products from the provider.
   *
   * @param query Search keyword.
   * @returns Standardized search results.
   */
  search(query: string): Promise<SearchResult[]>;
}
