import type { SearchResultModel } from "../models/search-result.model.js";
import type { SearchProvider } from "./search-provider.interface.js";
/**
 * Retrieves products from Konga.
 */
export declare class KongaProvider implements SearchProvider {
    readonly providerName = "Konga";
    search(query: string): Promise<SearchResultModel[]>;
}
