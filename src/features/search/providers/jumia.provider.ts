import type { SearchResultModel } from "../models/search-result.model.js";
import type { SearchProvider } from "./search-provider.interface.js";

/**
 * Retrieves products from Jumia.
 */
export class JumiaProvider implements SearchProvider {
  public readonly providerName = "Jumia";

  public async search(query: string): Promise<SearchResultModel[]> {
    void query;

    return [];
  }
}
