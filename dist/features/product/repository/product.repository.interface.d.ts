/**
 * -----------------------------------------------------------------------------
 * File: product.repository.interface.ts
 * Project: Prylensa Backend
 * Feature: Product
 *
 * Purpose:
 * Defines the Product repository contract.
 * -----------------------------------------------------------------------------
 */
import type { ProductModel } from "../models/product.model.js";
export interface IProductRepository {
    /**
     * Retrieves all active products.
     */
    findAll(): Promise<ProductModel[]>;
    /**
     * Retrieves a product by its identifier.
     */
    findById(id: string): Promise<ProductModel | null>;
    /**
     * Retrieves a product by its slug.
     */
    findBySlug(slug: string): Promise<ProductModel | null>;
    /**
     * Creates a product.
     */
    create(product: ProductModel): Promise<ProductModel>;
    /**
     * Updates a product.
     */
    update(product: ProductModel): Promise<ProductModel>;
    /**
     * Soft deletes a product.
     */
    delete(id: string): Promise<void>;
    /**
     * Checks whether a product exists.
     */
    exists(id: string): Promise<boolean>;
}
