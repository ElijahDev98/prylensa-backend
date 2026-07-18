/**
 * -----------------------------------------------------------------------------
 * File: product-response.dto.ts
 * Project: Priciq Backend
 * Feature: Product
 * -----------------------------------------------------------------------------
 */

import type { ProductImageDto } from "./product-image.dto.js";

export interface ProductBrandDto {
  id: string;
  name: string;
}

export interface ProductCategoryDto {
  id: string;
  name: string;
}

export interface ProductPriceSummaryDto {
  lowestPrice: number | null;
  highestPrice: number | null;
  averagePrice: number | null;
  offersCount: number;
}

export interface ProductResponseDto {
  id: string;

  name: string;

  description: string | null;

  thumbnail: string | null;

  brand: ProductBrandDto;

  category: ProductCategoryDto;

  images: ProductImageDto[];

  pricing: ProductPriceSummaryDto;

  createdAt: Date;

  updatedAt: Date;
}
