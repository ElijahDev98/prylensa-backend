import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "./offer-provider.interface.js";

/**
 * Retrieves products from Konga.
 */
export class KongaProvider implements OfferProvider {
  public readonly store = "Konga";

  public async search(query: string): Promise<Offer[]> {
    void query;

    return [];
  }
}
