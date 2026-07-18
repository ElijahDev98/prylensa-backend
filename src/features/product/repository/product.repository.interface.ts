/**
 * -----------------------------------------------------------------------------
 * File: product.repository.interface.ts
 * Project: Priciq Backend
 * Feature: Product
 *
 * Purpose:
 * Defines the contract for Product data access.
 * Services depend on this interface rather than a concrete repository.
 * -----------------------------------------------------------------------------
 */

import type { CreateProductDto } from "../dto/create-product.dto.js";
import type { UpdateProductDto } from "../dto/update-product.dto.js";
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
   * Creates a new product.
   */
  create(dto: CreateProductDto): Promise<ProductModel>;

  /**
   * Updates an existing product.
   */
  update(id: string, dto: UpdateProductDto): Promise<ProductModel>;

  /**
   * Performs a soft delete.
   */
  delete(id: string): Promise<void>;

  /**
   * Checks whether a product exists.
   */
  exists(id: string): Promise<boolean>;
}
