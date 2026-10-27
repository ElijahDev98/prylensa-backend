import assert from "node:assert/strict";
import test from "node:test";
import { SlotOfferMapper } from "./SlotOfferMapper.js";
test("maps Slot API assets and public product links to their correct hosts", () => {
    const product = {
        id: "slot-product-id",
        name: "Samsung Galaxy A07 4GB 64GB",
        sku: "SAMSUNG GALAXY A07 4GB 64GB",
        slug: "samsung-galaxy-a07-4gb-64gb",
        brand: "Samsung",
        short_description: "",
        original_price: null,
        price: 129_900,
        discount_percentage: null,
        image_link: "uploads/products/galaxy-a07.webp",
        label: {
            name: null,
            background_color: null,
            label_color: null,
        },
        status: "in_stock",
        quantity: 1,
    };
    const offer = SlotOfferMapper.toOffer(product);
    assert.equal(offer.imageUrl, "https://api-prod.slot.ng/storage/uploads/products/galaxy-a07.webp");
    assert.equal(offer.productUrl, "https://slot.ng/products/samsung-galaxy-a07-4gb-64gb");
});
test("preserves Slot's reported discount and derives a missing original price", () => {
    const offer = SlotOfferMapper.toOffer({
        id: "discounted-slot-product",
        name: "Samsung Galaxy A07 4GB 64GB",
        sku: "SAMSUNG GALAXY A07 4GB 64GB",
        slug: "samsung-galaxy-a07-4gb-64gb",
        brand: "Samsung",
        short_description: "",
        original_price: null,
        price: 120_000,
        discount_percentage: 20,
        image_link: "uploads/products/galaxy-a07.webp",
        label: {
            name: null,
            background_color: null,
            label_color: null,
        },
        status: "in_stock",
        quantity: 1,
    });
    assert.equal(offer.discountPercentage, 20);
    assert.equal(offer.originalPrice, 150_000);
});
//# sourceMappingURL=SlotOfferMapper.test.js.map