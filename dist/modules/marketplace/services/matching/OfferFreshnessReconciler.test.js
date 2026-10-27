import assert from "node:assert/strict";
import test from "node:test";
import { OfferFreshnessReconciler } from "./OfferFreshnessReconciler.js";
const reconciler = new OfferFreshnessReconciler();
const offer = (overrides) => ({
    id: "slot:iphone-16-pro-max",
    productId: "iphone-16-pro-max",
    title: "Apple iPhone 16 Pro Max 256GB",
    price: 1_700_000,
    currency: "NGN",
    imageUrl: "https://example.com/iphone.jpg",
    productUrl: "https://slot.ng/products/apple-iphone-16-pro-max-256gb",
    marketplace: "Slot",
    inStock: true,
    ...overrides,
});
test("a current changed price replaces the same store snapshot", () => {
    const offers = reconciler.reconcileCandidates([
        offer({
            productId: "live-id",
            price: 1_780_000,
            dataSource: "live",
            observedAt: "2026-08-24T09:00:00.000Z",
        }),
        offer({
            productId: "snapshot-id",
            price: 1_650_000,
            dataSource: "persisted-snapshot",
            observedAt: "2026-08-20T09:00:00.000Z",
        }),
    ]);
    assert.equal(offers.length, 1);
    assert.equal(offers[0]?.price, 1_780_000);
    assert.equal(offers[0]?.dataSource, "live");
});
test("a current unchanged price still replaces its snapshot", () => {
    const offers = reconciler.reconcileCandidates([
        offer({ productId: "live-id", dataSource: "live" }),
        offer({ productId: "snapshot-id", dataSource: "persisted-snapshot" }),
    ]);
    assert.equal(offers.length, 1);
    assert.equal(offers[0]?.dataSource, "live");
});
test("a snapshot for a different storage variant remains available", () => {
    const offers = reconciler.reconcileCandidates([
        offer({ productId: "live-256", dataSource: "live" }),
        offer({
            id: "slot:iphone-512",
            productId: "snapshot-512",
            title: "Apple iPhone 16 Pro Max 512GB",
            productUrl: "https://slot.ng/products/apple-iphone-16-pro-max-512gb",
            dataSource: "persisted-snapshot",
        }),
    ]);
    assert.equal(offers.length, 2);
});
test("matched groups use live stores and retain snapshots only for missing stores", () => {
    const offers = reconciler.reconcileMatchedGroup([
        offer({ productId: "slot-live", dataSource: "live" }),
        offer({ productId: "slot-old", price: 1_600_000, dataSource: "persisted-snapshot" }),
        offer({
            id: "konga:iphone",
            productId: "konga-old",
            marketplace: "Konga",
            dataSource: "persisted-snapshot",
        }),
    ]);
    assert.equal(offers.length, 2);
    assert.ok(offers.some((item) => item.marketplace === "Slot" && item.dataSource === "live"));
    assert.ok(offers.some((item) => item.marketplace === "Konga"));
});
test("stale snapshots retain price evidence but availability becomes unverified", () => {
    const snapshot = reconciler.withAvailabilityStatus(offer({
        dataSource: "persisted-snapshot",
        observedAt: "2026-08-19T09:00:00.000Z",
        inStock: true,
    }), Date.parse("2026-08-26T09:00:00.000Z"));
    assert.equal(snapshot.price, 1_700_000);
    assert.equal(snapshot.inStock, true);
    assert.equal(snapshot.availabilityStatus, "unverified");
});
test("recent snapshot availability remains usable within the evidence window", () => {
    const snapshot = reconciler.withAvailabilityStatus(offer({
        dataSource: "persisted-snapshot",
        observedAt: "2026-08-26T08:30:00.000Z",
        inStock: true,
    }), Date.parse("2026-08-26T09:00:00.000Z"));
    assert.equal(snapshot.inStock, true);
    assert.equal(snapshot.availabilityStatus, "in-stock");
});
test("different powerbank capacities are not reconciled as one listing", () => {
    const offers = reconciler.reconcileCandidates([
        offer({
            id: "slot:sporty-10k",
            productId: "sporty-b791",
            title: "SPORTY 10000MAH PD 22.5W POWER BANK B791",
            dataSource: "live",
        }),
        offer({
            id: "slot:sporty-20k-old",
            productId: "sporty-b653-old",
            title: "Sporty 45W Powerbank B653 - 20000mAh",
            dataSource: "persisted-snapshot",
            observedAt: "2026-08-26T08:30:00.000Z",
        }),
    ]);
    assert.equal(offers.length, 2);
});
//# sourceMappingURL=OfferFreshnessReconciler.test.js.map