/**
 * -----------------------------------------------------------------------------
 * File: product.model.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Represents the Product domain model used throughout the business layer.
 * This model is independent of Prisma and transport DTOs.
 * -----------------------------------------------------------------------------
 */

export interface ProductImageModel {
  id: string;

  imageUrl: string;

  altText: string | null;

  isPrimary: boolean;

  sortOrder: number;
}

export interface ProductBrandModel {
  id: string;

  name: string;
}

export interface ProductCategoryModel {
  id: string;

  name: string;
}

export interface ProductPricingModel {
  lowestPrice: number | null;

  highestPrice: number | null;

  averagePrice: number | null;

  offersCount: number;
}

export interface ProductModel {
  id: string;

  name: string;

  slug: string;

  sku: string | null;

  modelNumber: string | null;

  description: string | null;

  thumbnail: string | null;

  isActive: boolean;

  brand: ProductBrandModel;

  category: ProductCategoryModel;

  images: ProductImageModel[];

  pricing: ProductPricingModel;

  createdAt: Date;

  updatedAt: Date;
}
