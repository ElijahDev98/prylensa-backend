import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "./offer-provider.interface.js";
/**
 * Retrieves products from Slot.
 */
export declare class SlotProvider implements OfferProvider {
    readonly store = "Slot";
    search(query: string): Promise<Offer[]>;
}
