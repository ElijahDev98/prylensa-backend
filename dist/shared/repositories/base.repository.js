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
export class BaseRepository {
    /**
     * Shared Prisma Client.
     */
    prisma = prisma;
    /**
     * Returns the current timestamp.
     * Useful for audit fields and soft deletes.
     */
    now() {
        return new Date();
    }
    /**
     * Standard soft-delete payload.
     */
    getSoftDeleteData() {
        return {
            deletedAt: this.now(),
        };
    }
    /**
     * Standard active-record filter.
     */
    getActiveFilter() {
        return {
            deletedAt: null,
        };
    }
    /**
     * Standard pagination.
     */
    buildPagination(page = 1, limit = 20) {
        const safePage = Math.max(page, 1);
        const safeLimit = Math.max(limit, 1);
        return {
            skip: (safePage - 1) * safeLimit,
            take: safeLimit,
        };
    }
}
//# sourceMappingURL=base.repository.js.map