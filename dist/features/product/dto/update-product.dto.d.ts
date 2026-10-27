/**
 * -----------------------------------------------------------------------------
 * File: update-product.dto.ts
 * Project: Prylensa Backend
 * Feature: Product
 * -----------------------------------------------------------------------------
 */
import type { CreateProductDto } from "./create-product.dto.js";
export type UpdateProductDto = Partial<CreateProductDto>;
