import type { SearchResult } from "../models/search-result.model.js";
import type { SearchProvider } from "./search-provider.interface.js";

/**
 * Retrieves products from Slot.
 */
export class SlotProvider implements SearchProvider {
  public readonly providerName = "Slot";

  public async search(query: string): Promise<SearchResult[]> {
    void query;

    return [];
  }
}
