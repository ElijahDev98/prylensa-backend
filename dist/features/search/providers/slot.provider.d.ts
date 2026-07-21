import type { SearchResult } from "../models/search-result.model.js";
import type { SearchProvider } from "./search-provider.interface.js";
/**
 * Retrieves products from Slot.
 */
export declare class SlotProvider implements SearchProvider {
    readonly providerName = "Slot";
    search(query: string): Promise<SearchResult[]>;
}
