import { MARKETPLACE_SNAPSHOT_AVAILABILITY_MAX_AGE_MS } from "../../constants/marketplace-search.constants.js";
const MODEL_QUALIFIERS = [
    "pro",
    "max",
    "plus",
    "ultra",
    "mini",
    "air",
    "fold",
    "flip",
];
/**
 * Reconciles current provider observations with stored fallback snapshots.
 * Stored data fills coverage gaps, but never competes with a matching live
 * marketplace listing.
 */
export class OfferFreshnessReconciler {
    reconcileCandidates(offers) {
        const normalizedOffers = offers.map((offer) => this.withAvailabilityStatus(offer));
        const liveOffers = normalizedOffers.filter((offer) => offer.dataSource !== "persisted-snapshot");
        const snapshots = normalizedOffers.filter((offer) => offer.dataSource === "persisted-snapshot");
        const reconciled = this.collapseExactListings(liveOffers);
        for (const snapshot of snapshots) {
            const hasCurrentListing = liveOffers.some((liveOffer) => this.isSameMarketplaceListing(liveOffer, snapshot));
            if (!hasCurrentListing)
                reconciled.push(snapshot);
        }
        return this.collapseExactListings(reconciled);
    }
    /**
     * AI grouping and variant splitting establish product identity. At that
     * point, any live observation for a marketplace supersedes that
     * marketplace's fallback snapshots inside the group.
     */
    reconcileMatchedGroup(offers) {
        const normalizedOffers = offers.map((offer) => this.withAvailabilityStatus(offer));
        const marketplacesWithLiveData = new Set(normalizedOffers
            .filter((offer) => offer.dataSource !== "persisted-snapshot")
            .map((offer) => offer.marketplace.trim().toLowerCase()));
        return this.collapseExactListings(normalizedOffers.filter((offer) => offer.dataSource !== "persisted-snapshot" ||
            !marketplacesWithLiveData.has(offer.marketplace.trim().toLowerCase())));
    }
    withAvailabilityStatus(offer, now = Date.now()) {
        if (offer.dataSource !== "persisted-snapshot") {
            return {
                ...offer,
                availabilityStatus: offer.inStock ? "in-stock" : "out-of-stock",
            };
        }
        const observedTime = Date.parse(offer.observedAt ?? "");
        const isRecent = Number.isFinite(observedTime) &&
            Math.max(0, now - observedTime) <= MARKETPLACE_SNAPSHOT_AVAILABILITY_MAX_AGE_MS;
        return {
            ...offer,
            availabilityStatus: isRecent
                ? (offer.inStock ? "in-stock" : "out-of-stock")
                : "unverified",
        };
    }
    collapseExactListings(offers) {
        const unique = new Map();
        for (const offer of offers) {
            const key = [
                offer.marketplace.trim().toLowerCase(),
                offer.productId.trim().toLowerCase(),
            ].join("|");
            const existing = unique.get(key);
            if (!existing || this.isFresher(offer, existing))
                unique.set(key, offer);
        }
        return [...unique.values()];
    }
    isFresher(candidate, existing) {
        if (candidate.dataSource !== existing.dataSource) {
            return candidate.dataSource !== "persisted-snapshot";
        }
        const candidateTime = Date.parse(candidate.observedAt ?? "");
        const existingTime = Date.parse(existing.observedAt ?? "");
        return Number.isFinite(candidateTime) &&
            (!Number.isFinite(existingTime) || candidateTime > existingTime);
    }
    isSameMarketplaceListing(left, right) {
        if (left.marketplace.trim().toLowerCase() !== right.marketplace.trim().toLowerCase()) {
            return false;
        }
        const leftTitle = this.normalizeTitle(left.title);
        const rightTitle = this.normalizeTitle(right.title);
        if (!this.hasCompatibleVariant(leftTitle, rightTitle))
            return false;
        if (left.productId.trim().toLowerCase() === right.productId.trim().toLowerCase()) {
            return true;
        }
        const leftSlug = this.productSlug(left.productUrl);
        const rightSlug = this.productSlug(right.productUrl);
        if (leftSlug && rightSlug && leftSlug === rightSlug)
            return true;
        if (leftTitle === rightTitle)
            return true;
        const leftTokens = new Set(leftTitle.split(" ").filter(Boolean));
        const rightTokens = new Set(rightTitle.split(" ").filter(Boolean));
        const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length;
        const smallerSize = Math.min(leftTokens.size, rightTokens.size);
        const unionSize = new Set([...leftTokens, ...rightTokens]).size;
        return smallerSize > 0 &&
            intersection / smallerSize >= 0.8 &&
            intersection / unionSize >= 0.6;
    }
    hasCompatibleVariant(leftTitle, rightTitle) {
        const leftStorage = this.storageCapacity(leftTitle);
        const rightStorage = this.storageCapacity(rightTitle);
        if (leftStorage && rightStorage && leftStorage !== rightStorage)
            return false;
        const leftBattery = this.batteryCapacity(leftTitle);
        const rightBattery = this.batteryCapacity(rightTitle);
        if (leftBattery && rightBattery && leftBattery !== rightBattery)
            return false;
        const leftAccessoryModel = this.accessoryModel(leftTitle);
        const rightAccessoryModel = this.accessoryModel(rightTitle);
        if (leftAccessoryModel &&
            rightAccessoryModel &&
            leftAccessoryModel !== rightAccessoryModel)
            return false;
        const leftUsed = /\b(preowned|refurbished|renewed|used)\b/.test(leftTitle);
        const rightUsed = /\b(preowned|refurbished|renewed|used)\b/.test(rightTitle);
        if (leftUsed !== rightUsed)
            return false;
        return MODEL_QUALIFIERS.every((qualifier) => leftTitle.split(" ").includes(qualifier) === rightTitle.split(" ").includes(qualifier));
    }
    storageCapacity(title) {
        const capacities = [...title.matchAll(/\b(\d+)\s*(gb|tb)\b/g)]
            .map((match) => Number(match[1]) * (match[2] === "tb" ? 1024 : 1))
            .filter((capacity) => capacity >= 32);
        return capacities.length > 0 ? Math.max(...capacities) : undefined;
    }
    batteryCapacity(title) {
        const match = title.match(/\b(\d{1,3}(?:[,.\s]\d{3})+|\d{4,6})\s*m\s*ah\b/);
        if (!match)
            return undefined;
        const capacity = Number(match[1]?.replace(/[^\d]/g, ""));
        return capacity >= 1000 && capacity <= 100000 ? capacity : undefined;
    }
    accessoryModel(title) {
        if (!/\bpower\s*bank\b|\bpowerbank\b/.test(title))
            return undefined;
        return title.match(/\b([a-z]\d{3,5})\b/)?.[1];
    }
    productSlug(value) {
        try {
            const segments = new URL(value).pathname
                .toLowerCase()
                .split("/")
                .filter(Boolean);
            return segments.at(-1)?.replace(/\.(html?|aspx?)$/, "") ?? "";
        }
        catch {
            return "";
        }
    }
    normalizeTitle(value) {
        return value
            .toLowerCase()
            .replace(/pre[ -]?owned/g, "preowned")
            .replace(/(\d+)\s*(gb|tb)\b/g, "$1$2")
            .replace(/[^a-z0-9]+/g, " ")
            .trim()
            .replace(/\s+/g, " ");
    }
}
//# sourceMappingURL=OfferFreshnessReconciler.js.map