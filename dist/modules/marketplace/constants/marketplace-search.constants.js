export const MARKETPLACE_OFFER_TARGET = 15;
// Broad category queries need a wider persisted evidence window so products
// returned outside a provider's first live page can still be matched across
// stores. These records remain explicitly marked as snapshots.
export const MARKETPLACE_FALLBACK_OFFER_TARGET = 30;
export const MARKETPLACE_SNAPSHOT_AVAILABILITY_MAX_AGE_MS = 24 * 60 * 60 * 1000;
//# sourceMappingURL=marketplace-search.constants.js.map