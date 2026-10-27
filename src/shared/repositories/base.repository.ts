/**
 * -----------------------------------------------------------------------------
 * File: base.repository.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Provides common repository functionality shared across all repositories.
 * Feature repositories inherit from this class while implementing their own
 * domain-specific Prisma queries.
 * -----------------------------------------------------------------------------
 */

import { prisma } from "../database/index.js";

export abstract class BaseRepository {
  /**
   * Shared Prisma Client.
   */
  protected readonly prisma = prisma;

  /**
   * Returns the current timestamp.
   * Useful for audit fields and soft deletes.
   */
  protected now(): Date {
    return new Date();
  }

  /**
   * Standard soft-delete payload.
   */
  protected getSoftDeleteData() {
    return {
      deletedAt: this.now(),
    };
  }

  /**
   * Standard active-record filter.
   */
  protected getActiveFilter() {
    return {
      deletedAt: null,
    };
  }

  /**
   * Standard pagination.
   */
  protected buildPagination(page: number = 1, limit: number = 20) {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);

    return {
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    };
  }
}
