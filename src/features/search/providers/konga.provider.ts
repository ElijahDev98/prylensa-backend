import type { SearchResultModel } from "../models/search-result.model.js";
import type { SearchProvider } from "./search-provider.interface.js";

/**
 * Retrieves products from Konga.
 */
export class KongaProvider implements SearchProvider {
  public readonly providerName = "Konga";

  public async search(query: string): Promise<SearchResultModel[]> {
    void query;

    return [];
  }
}
