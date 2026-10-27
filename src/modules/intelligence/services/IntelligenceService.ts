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

import type {
  RecordSearchActivityRequestDto,
  RecordSearchActivityResponseDto,
  SavedSearchDto,
} from "../dto/UserSearchActivityDto.js";

export class IntelligenceService {
  public async listSavedSearches(userId: string): Promise<SavedSearchDto[]> {
    const searches = await prisma.savedSearch.findMany({
      where: { userId },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });
    return searches.map((search) => this.toSavedSearchDto(search));
  }

  public async saveSearch(userId: string, value: string): Promise<SavedSearchDto> {
    const query = value.trim().replace(/\s+/g, " ");
    if (!query) throw new Error("Search query is required.");

    const normalizedQuery = query.toLowerCase();
    const search = await prisma.savedSearch.upsert({
      where: { userId_normalizedQuery: { userId, normalizedQuery } },
      create: { userId, query, normalizedQuery },
      update: { query },
    });
    return this.toSavedSearchDto(search);
  }

  public async removeSavedSearch(userId: string, id: string): Promise<void> {
    await prisma.savedSearch.deleteMany({ where: { id, userId } });
  }

  public async markSavedSearchRefreshed(
    userId: string,
    id: string,
  ): Promise<SavedSearchDto> {
    const current = await prisma.savedSearch.findFirst({ where: { id, userId } });
    if (!current) throw new Error("Saved search was not found.");

    const search = await prisma.savedSearch.update({
      where: { id },
      data: { lastRefreshedAt: new Date() },
    });
    return this.toSavedSearchDto(search);
  }

  public async recordSearchActivity(
    input: RecordSearchActivityRequestDto,
  ): Promise<RecordSearchActivityResponseDto> {
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

  private toSavedSearchDto(search: {
    id: string;
    query: string;
    lastRefreshedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }): SavedSearchDto {
    return {
      id: search.id,
      query: search.query,
      lastRefreshedAt: search.lastRefreshedAt?.toISOString() ?? null,
      createdAt: search.createdAt.toISOString(),
      updatedAt: search.updatedAt.toISOString(),
    };
  }
}
