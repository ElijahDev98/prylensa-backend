/**
 * -----------------------------------------------------------------------------
 * File: product.mapper.ts
 * Project: Prylensa Backend
 * Feature: Product
 *
 * Purpose:
 * Maps Product Prisma entities, domain models, and response DTOs.
 * -----------------------------------------------------------------------------
 */
import type { ProductResponseDto } from "../dto/product-response.dto.js";
import type { ProductModel } from "../models/product.model.js";
import type { ProductWithRelations } from "../types/product-prisma.type.js";
export declare class ProductMapper {
    /**
     * Prisma → Domain Model
     */
    static fromPrisma(product: ProductWithRelations): ProductModel;
    /**
     * Domain Model → Response DTO
     */
    static toResponse(product: ProductModel): ProductResponseDto;
    /**
     * Prisma[] → Domain Models
     */
    static fromPrismaList(products: ProductWithRelations[]): ProductModel[];
    /**
     * Domain Models → Response DTOs
     */
    static toResponseList(products: ProductModel[]): ProductResponseDto[];
}
