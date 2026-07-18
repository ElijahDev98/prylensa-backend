/**
 * -----------------------------------------------------------------------------
 * File: create-product.dto.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Contract for creating a product.
 * -----------------------------------------------------------------------------
 */

export interface CreateProductDto {
  name: string;
  description?: string;
  categoryId: string;
  brandId: string;
}
