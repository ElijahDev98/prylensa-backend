/**
 * -----------------------------------------------------------------------------
 * File: IntelligenceService.ts
 * Module: Intelligence
 *
 * Purpose:
 * Persists user intelligence activity that already fits the Postgres schema.
 * -----------------------------------------------------------------------------
 */
import type { RecordSearchActivityRequestDto, RecordSearchActivityResponseDto, SavedSearchDto } from "../dto/UserSearchActivityDto.js";
export declare class IntelligenceService {
    listSavedSearches(userId: string): Promise<SavedSearchDto[]>;
    saveSearch(userId: string, value: string): Promise<SavedSearchDto>;
    removeSavedSearch(userId: string, id: string): Promise<void>;
    markSavedSearchRefreshed(userId: string, id: string): Promise<SavedSearchDto>;
    recordSearchActivity(input: RecordSearchActivityRequestDto): Promise<RecordSearchActivityResponseDto>;
    private toSavedSearchDto;
}
