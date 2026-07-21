import { JumiaProvider } from "./jumia.provider.js";
import { KongaProvider } from "./konga.provider.js";
import { SlotProvider } from "./slot.provider.js";
/**
 * Registers all supported search providers.
 */
export class ProviderManager {
    providers;
    constructor() {
        this.providers = [
            new JumiaProvider(),
            new KongaProvider(),
            new SlotProvider(),
        ];
    }
    getProviders() {
        return this.providers;
    }
}
//# sourceMappingURL=provider-manager.js.map