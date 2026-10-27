import type { Offer } from "../../models/Offer.js";
/**
 * Reconciles current provider observations with stored fallback snapshots.
 * Stored data fills coverage gaps, but never competes with a matching live
 * marketplace listing.
 */
export declare class OfferFreshnessReconciler {
    reconcileCandidates(offers: readonly Offer[]): Offer[];
    /**
     * AI grouping and variant splitting establish product identity. At that
     * point, any live observation for a marketplace supersedes that
     * marketplace's fallback snapshots inside the group.
     */
    reconcileMatchedGroup(offers: readonly Offer[]): Offer[];
    withAvailabilityStatus(offer: Offer, now?: number): Offer;
    private collapseExactListings;
    private isFresher;
    private isSameMarketplaceListing;
    private hasCompatibleVariant;
    private storageCapacity;
    private batteryCapacity;
    private accessoryModel;
    private productSlug;
    private normalizeTitle;
}
