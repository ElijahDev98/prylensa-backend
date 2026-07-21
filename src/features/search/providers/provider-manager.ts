import type { OfferProvider } from "./offer-provider.interface.js";

import { JumiaProvider } from "./jumia.provider.js";
import { KongaProvider } from "./konga.provider.js";
import { SlotProvider } from "./slot.provider.js";

/**
 * Registers all supported search providers.
 */
export class ProviderManager {
  private readonly providers: OfferProvider[];

  constructor() {
    this.providers = [
      new JumiaProvider(),
      new KongaProvider(),
      new SlotProvider(),
    ];
  }

  public getProviders(): OfferProvider[] {
    return this.providers;
  }
}
