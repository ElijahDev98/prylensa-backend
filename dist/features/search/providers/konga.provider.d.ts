import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "./offer-provider.interface.js";
/**
 * Retrieves products from Konga.
 */
export declare class KongaProvider implements OfferProvider {
    readonly store = "Konga";
    search(query: string): Promise<Offer[]>;
}
