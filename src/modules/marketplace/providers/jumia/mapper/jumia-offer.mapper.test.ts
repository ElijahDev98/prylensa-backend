import assert from "node:assert/strict";
import test from "node:test";

import { JumiaOfferMapper } from "./jumia-offer.mapper.js";

import type { JumiaProductDto } from "../dto/jumia-product.dto.js";

function productWithPrices(prices: JumiaProductDto["prices"]): JumiaProductDto {
  return {
    sku: "JUMIA-SKU",
    name: "Samsung Galaxy A07 4GB 64GB",
    brand: "Samsung",
    categories: ["Phones"],
    prices,
    image: "https://example.com/galaxy-a07.webp",
    url: "/samsung-galaxy-a07.html",
    isBuyable: true,
  };
}

test("preserves Jumia's explicit discount and old price", () => {
  const offer = new JumiaOfferMapper().map(
    productWithPrices({
      rawPrice: "120000.00",
      price: "N 120,000",
      oldPrice: "N 150,000",
      discount: "20%",
    }),
  );

  assert.equal(offer.price, 120_000);
  assert.equal(offer.originalPrice, 150_000);
  assert.equal(offer.discountPercentage, 20);
});

test("derives Jumia's original price when only a discount is reported", () => {
  const offer = new JumiaOfferMapper().map(
    productWithPrices({
      rawPrice: "120000.00",
      price: "N 120,000",
      discount: "20%",
    }),
  );

  assert.equal(offer.originalPrice, 150_000);
  assert.equal(offer.discountPercentage, 20);
});
