import type { OfferProvider } from "./offer-provider.interface.js";
/**
 * Registers all supported search providers.
 */
export declare class ProviderManager {
    private readonly providers;
    constructor();
    getProviders(): OfferProvider[];
}
