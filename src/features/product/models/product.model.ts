/**
 * -----------------------------------------------------------------------------
 * File: product.model.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Represents the Product domain model used internally by the application.
 * This model is independent of Prisma and API DTOs.
 * -----------------------------------------------------------------------------
 */

export interface ProductImageModel {
  id: string;

  imageUrl: string;

  altText: string | null;

  isPrimary: boolean;
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

  description: string | null;

  brand: ProductBrandModel;

  category: ProductCategoryModel;

  thumbnail: string | null;

  images: ProductImageModel[];

  pricing: ProductPricingModel;

  createdAt: Date;

  updatedAt: Date;
}
