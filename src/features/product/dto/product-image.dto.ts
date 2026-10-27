/**
 * -----------------------------------------------------------------------------
 * File: product-image.dto.ts
 * Project: Prylensa Backend
 * Feature: Product
 *
 * Purpose:
 * DTOs related to product images.
 * -----------------------------------------------------------------------------
 */

export interface CreateProductImageDto {
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
}

export interface ProductImageDto {
  id: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
}
