import assert from "node:assert/strict";
import test from "node:test";
import { MarketplaceRepository } from "./MarketplaceRepository.js";
const liveOffer = {
    id: "konga:iphone-16",
    productId: "iphone-16",
    title: "Apple iPhone 16 Pro Max 256GB",
    price: 1_640_000,
    currency: "NGN",
    imageUrl: "https://example.com/iphone.jpg",
    productUrl: "https://example.com/iphone",
    marketplace: "Konga",
    inStock: true,
    dataSource: "live",
};
test("search collapses repeated provider rows and prefers live data", async () => {
    const provider = {
        name: "Konga",
        search: async () => [liveOffer, { ...liveOffer }],
        getProduct: async () => {
            throw new Error("Not used by repository search.");
        },
    };
    const repository = new MarketplaceRepository([provider]);
    Object.assign(repository, {
        getPersistedOffers: async () => [{
                ...liveOffer,
                price: 1_700_000,
                dataSource: "persisted-snapshot",
            }],
    });
    const offers = await repository.search("iphone 16 pro max");
    assert.equal(offers.length, 1);
    assert.equal(offers[0]?.price, 1_640_000);
    assert.equal(offers[0]?.dataSource, "live");
    assert.ok(offers[0]?.observedAt);
    assert.ok(Number.isFinite(Date.parse(offers[0]?.observedAt ?? "")));
});
test("search replaces a lower snapshot when the live listing identifier changes", async () => {
    const provider = {
        name: "Konga",
        search: async () => [{
                ...liveOffer,
                productId: "current-provider-4481",
                price: 1_720_000,
                productUrl: "https://www.konga.com/product/apple-iphone-16-pro-max-256gb-4481",
            }],
        getProduct: async () => {
            throw new Error("Not used by repository search.");
        },
    };
    const repository = new MarketplaceRepository([provider]);
    Object.assign(repository, {
        getPersistedOffers: async () => [{
                ...liveOffer,
                id: "konga:stored-iphone",
                productId: "stored-provider-9920",
                price: 1_590_000,
                productUrl: "https://www.konga.com/product/apple-iphone-16-pro-max-256gb-4481",
                dataSource: "persisted-snapshot",
                observedAt: "2026-08-01T12:00:00.000Z",
            }],
    });
    const offers = await repository.search("iphone 16 pro max");
    assert.equal(offers.length, 1);
    assert.equal(offers[0]?.price, 1_720_000);
    assert.equal(offers[0]?.dataSource, "live");
});
//# sourceMappingURL=MarketplaceRepository.test.js.map