/**
 * -----------------------------------------------------------------------------
 * File: product-response.dto.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Standard response contract for Product.
 * -----------------------------------------------------------------------------
 */

export interface ProductResponseDto {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  brandId: string;
  createdAt: Date;
  updatedAt: Date;
}
