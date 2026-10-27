import assert from "node:assert/strict";
import test from "node:test";

import { KongaOfferMapper } from "./KongaOfferMapper.js";

test("derives Konga's discount only from a valid special price", () => {
  const offer = KongaOfferMapper.toOffer({
    objectid: "KONGA-ID",
    name: "Samsung Galaxy A07 4GB 64GB",
    brand: "Samsung",
    price: 150_000,
    special_price: 120_000,
    stock: { in_stock: 1 },
  });

  assert.equal(offer.price, 120_000);
  assert.equal(offer.originalPrice, 150_000);
  assert.equal(offer.discountPercentage, 20);
});

test("does not advertise a discount when Konga's special price is unchanged", () => {
  const offer = KongaOfferMapper.toOffer({
    objectid: "KONGA-ID",
    name: "Samsung Galaxy A07 4GB 64GB",
    price: 150_000,
    special_price: 150_000,
    stock: { in_stock: 1 },
  });

  assert.equal(offer.price, 150_000);
  assert.equal(offer.originalPrice, undefined);
  assert.equal(offer.discountPercentage, undefined);
});
