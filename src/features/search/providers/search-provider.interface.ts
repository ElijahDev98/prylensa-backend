import type { SearchResultModel } from "../models/search-result.model.js";

/**
 * Contract implemented by every supported
 * e-commerce search provider.
 */
export interface SearchProvider {
  /**
   * Provider display name.
   * Example: "Jumia"
   */
  readonly providerName: string;

  /**
   * Searches the provider for products
   * matching the supplied keyword.
   */
  search(query: string): Promise<SearchResultModel[]>;
}
