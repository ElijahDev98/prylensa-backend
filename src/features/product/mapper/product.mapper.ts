/**
 * -----------------------------------------------------------------------------
 * File: product.mapper.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Maps Product domain models to API response DTOs.
 * -----------------------------------------------------------------------------
 */

import type { ProductModel } from "../models/product.model.js";
import type { ProductResponseDto } from "../dto/product-response.dto.js";

export class ProductMapper {
  /**
   * Maps a Product domain model to an API response DTO.
   */
  public static toResponse(product: ProductModel): ProductResponseDto {
    return {
      id: product.id,

      name: product.name,

      description: product.description,

      thumbnail: product.thumbnail,

      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },

      category: {
        id: product.category.id,
        name: product.category.name,
      },

      images: product.images.map((image) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        altText: image.altText,
        isPrimary: image.isPrimary,
      })),

      pricing: {
        lowestPrice: product.pricing.lowestPrice,
        highestPrice: product.pricing.highestPrice,
        averagePrice: product.pricing.averagePrice,
        offersCount: product.pricing.offersCount,
      },

      createdAt: product.createdAt,

      updatedAt: product.updatedAt,
    };
  }

  /**
   * Maps multiple Product domain models.
   */
  public static toResponseList(products: ProductModel[]): ProductResponseDto[] {
    return products.map(ProductMapper.toResponse);
  }
}
