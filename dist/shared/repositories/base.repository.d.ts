/**
 * -----------------------------------------------------------------------------
 * File: base.repository.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Provides common repository functionality shared across all repositories.
 * Feature repositories inherit from this class while implementing their own
 * domain-specific Prisma queries.
 * -----------------------------------------------------------------------------
 */
export declare abstract class BaseRepository {
    /**
     * Shared Prisma Client.
     */
    protected readonly prisma: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/client").DefaultArgs>;
    /**
     * Returns the current timestamp.
     * Useful for audit fields and soft deletes.
     */
    protected now(): Date;
    /**
     * Standard soft-delete payload.
     */
    protected getSoftDeleteData(): {
        deletedAt: Date;
    };
    /**
     * Standard active-record filter.
     */
    protected getActiveFilter(): {
        deletedAt: null;
    };
    /**
     * Standard pagination.
     */
    protected buildPagination(page?: number, limit?: number): {
        skip: number;
        take: number;
    };
}
