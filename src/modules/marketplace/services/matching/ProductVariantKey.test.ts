import assert from "node:assert/strict";
import test from "node:test";

import { createProductVariantKey } from "./ProductVariantKey.js";

test("keeps 14 and 14.2 inch MacBook listings in one display class", () => {
  const listedAs14 = createProductVariantKey(
    "Apple MacBook Pro 14-inch M4 Pro 24GB RAM 512GB SSD",
  );
  const listedAs142 = createProductVariantKey(
    "Apple MacBook Pro 14.2 Inch M4 Pro 24GB RAM 512GB SSD",
  );

  assert.equal(listedAs14, listedAs142);
});

test("separates 14 and 16 inch MacBook display classes", () => {
  const listedAs14 = createProductVariantKey(
    "Apple MacBook Pro 14-inch M4 Pro 24GB RAM 512GB SSD",
  );
  const listedAs16 = createProductVariantKey(
    "Apple MacBook Pro 16.2 Inch M4 Pro 24GB RAM 512GB SSD",
  );

  assert.notEqual(listedAs14, listedAs16);
});

test("separates Tecno Pop from Tecno Spark with otherwise matching specs", () => {
  const pop = createProductVariantKey("TECNO POP 9 4GB RAM 128GB ROM");
  const spark = createProductVariantKey("Tecno Spark 30 4GB RAM 128GB ROM");

  assert.notEqual(pop, spark);
});

test("separates distinct Tecno Spark models", () => {
  const spark20 = createProductVariantKey("TECNO SPARK 20 8GB RAM 256GB ROM");
  const spark30 = createProductVariantKey("Tecno Spark 30 8GB RAM 256GB ROM");

  assert.notEqual(spark20, spark30);
});

test("separates MacBook M1 8GB and 16GB memory variants", () => {
  const eightGb = createProductVariantKey(
    "Apple MacBook Air 13-inch M1 8GB unified memory 256GB SSD",
  );
  const sixteenGb = createProductVariantKey(
    "Apple MacBook Air 13-inch M1 16 RAM 256GB SSD",
  );

  assert.notEqual(eightGb, sixteenGb);
});

test("normalizes equivalent MacBook 13-inch M1 RAM wording", () => {
  const unifiedMemory = createProductVariantKey(
    "Apple MacBook Air 13.3-inch M1 8GB unified memory 256GB SSD",
  );
  const slashCapacity = createProductVariantKey(
    "Apple MacBook Air 13-inch M1 8GB/256GB SSD",
  );

  assert.equal(unifiedMemory, slashCapacity);
});

test("ignores color when the MacBook model and capacity are identical", () => {
  const skyBlue = createProductVariantKey(
    'Macbook Air 13" M4 Chip 16gb Ram - 256gb - 2025 Model - Sky Blue',
  );
  const midnight = createProductVariantKey(
    'Macbook Air 13" M4 Chip 16GB RAM - 256GB - 2025 Model - Midnight',
  );

  assert.equal(skyBlue, midnight);
});
