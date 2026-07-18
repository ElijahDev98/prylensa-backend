/**
 * -----------------------------------------------------------------------------
 * File: create-product.dto.ts
 * Project: Priciq Backend
 * Feature: Product
 * -----------------------------------------------------------------------------
 */

import type { CreateProductImageDto } from "./product-image.dto.js";

export interface CreateProductDto {
  name: string;

  description?: string;

  categoryId: string;

  brandId: string;

  images: CreateProductImageDto[];
}
