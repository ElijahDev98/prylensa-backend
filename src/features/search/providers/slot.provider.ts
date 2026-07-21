import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "./offer-provider.interface.js";

/**
 * Retrieves products from Slot.
 */
export class SlotProvider implements OfferProvider {
  public readonly store = "Slot";

  public async search(query: string): Promise<Offer[]> {
    void query;

    return [];
  }
}
