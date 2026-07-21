import type { SearchProvider } from "./search-provider.interface.js";
/**
 * Registers all supported search providers.
 */
export declare class ProviderManager {
    private readonly providers;
    constructor();
    getProviders(): SearchProvider[];
}
