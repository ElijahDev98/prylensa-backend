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

import { ProductMapper } from "../mapper/product.mapper.js";

import type { ProductModel } from "../models/product.model.js";

import { PRODUCT_INCLUDE } from "../types/product-prisma.type.js";

import type { IProductRepository } from "./product.repository.interface.js";

export class PrismaProductRepository
  extends BaseRepository
  implements IProductRepository
{
  public async findAll(): Promise<ProductModel[]> {
    const products = await this.prisma.product.findMany({
      where: {
        ...this.getActiveFilter(),
        isActive: true,
      },
      include: PRODUCT_INCLUDE,
      orderBy: {
        createdAt: "desc",
      },
    });

    return ProductMapper.fromPrismaList(products);
  }

  public async findById(id: string): Promise<ProductModel | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: PRODUCT_INCLUDE,
    });

    if (!product || product.deletedAt !== null || !product.isActive) {
      return null;
    }

    return ProductMapper.fromPrisma(product);
  }

  public async findBySlug(slug: string): Promise<ProductModel | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      include: PRODUCT_INCLUDE,
    });

    if (!product || product.deletedAt !== null || !product.isActive) {
      return null;
    }

    return ProductMapper.fromPrisma(product);
  }

  public async create(product: ProductModel): Promise<ProductModel> {
    const createdProduct = await this.prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        modelNumber: product.modelNumber,
        description: product.description,
        thumbnailUrl: product.thumbnail,
        isActive: product.isActive,

        brandId: product.brand.id,
        categoryId: product.category.id,

        images: {
          create: product.images.map((image) => ({
            url: image.imageUrl,
            altText: image.altText,
            isPrimary: image.isPrimary,
            sortOrder: image.sortOrder,
          })),
        },
      },
      include: PRODUCT_INCLUDE,
    });

    return ProductMapper.fromPrisma(createdProduct);
  }

  public async update(product: ProductModel): Promise<ProductModel> {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        modelNumber: product.modelNumber,
        description: product.description,
        thumbnailUrl: product.thumbnail,
        isActive: product.isActive,
        brandId: product.brand.id,
        categoryId: product.category.id,
      },
      include: PRODUCT_INCLUDE,
    });

    return ProductMapper.fromPrisma(updatedProduct);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.product.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data: this.getSoftDeleteData(),
    });
  }

  public async exists(id: string): Promise<boolean> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    return product !== null;
  }
}
