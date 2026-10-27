/**
 * -----------------------------------------------------------------------------
 * File: prisma-product.repository.ts
 * Project: Prylensa Backend
 * Feature: Product
 *
 * Purpose:
 * Prisma implementation of the Product repository.
 * -----------------------------------------------------------------------------
 */
import { BaseRepository } from "../../../shared/repositories/base.repository.js";
import type { ProductModel } from "../models/product.model.js";
import type { IProductRepository } from "./product.repository.interface.js";
export declare class PrismaProductRepository extends BaseRepository implements IProductRepository {
    findAll(): Promise<ProductModel[]>;
    findById(id: string): Promise<ProductModel | null>;
    findBySlug(slug: string): Promise<ProductModel | null>;
    create(product: ProductModel): Promise<ProductModel>;
    update(product: ProductModel): Promise<ProductModel>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
}
