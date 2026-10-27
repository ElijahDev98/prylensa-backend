/**
 * -----------------------------------------------------------------------------
 * File: IntelligenceService.ts
 * Module: Intelligence
 *
 * Purpose:
 * Persists user intelligence activity that already fits the Postgres schema.
 * -----------------------------------------------------------------------------
 */
import { prisma } from "../../../shared/database/index.js";
export class IntelligenceService {
    async listSavedSearches(userId) {
        const searches = await prisma.savedSearch.findMany({
            where: { userId },
            orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
        });
        return searches.map((search) => this.toSavedSearchDto(search));
    }
    async saveSearch(userId, value) {
        const query = value.trim().replace(/\s+/g, " ");
        if (!query)
            throw new Error("Search query is required.");
        const normalizedQuery = query.toLowerCase();
        const search = await prisma.savedSearch.upsert({
            where: { userId_normalizedQuery: { userId, normalizedQuery } },
            create: { userId, query, normalizedQuery },
            update: { query },
        });
        return this.toSavedSearchDto(search);
    }
    async removeSavedSearch(userId, id) {
        await prisma.savedSearch.deleteMany({ where: { id, userId } });
    }
    async markSavedSearchRefreshed(userId, id) {
        const current = await prisma.savedSearch.findFirst({ where: { id, userId } });
        if (!current)
            throw new Error("Saved search was not found.");
        const search = await prisma.savedSearch.update({
            where: { id },
            data: { lastRefreshedAt: new Date() },
        });
        return this.toSavedSearchDto(search);
    }
    async recordSearchActivity(input) {
        const userId = input.userId?.trim();
        const query = input.query?.trim();
        if (!userId || !query) {
            return {
                recorded: false,
            };
        }
        const searchHistory = await prisma.searchHistory.create({
            data: {
                userId,
                query,
            },
        });
        return {
            recorded: true,
            id: searchHistory.id,
            query: searchHistory.query,
            createdAt: searchHistory.createdAt.toISOString(),
        };
    }
    toSavedSearchDto(search) {
        return {
            id: search.id,
            query: search.query,
            lastRefreshedAt: search.lastRefreshedAt?.toISOString() ?? null,
            createdAt: search.createdAt.toISOString(),
            updatedAt: search.updatedAt.toISOString(),
        };
    }
}
//# sourceMappingURL=IntelligenceService.js.map