import type { SearchResponseDto } from "../dto/SearchResponseDto.js";
import type { DatasetAnalyticsDto, TrainingDatasetQueryDto, TrainingDatasetResponseDto } from "../dto/TrainingDatasetDto.js";
interface CaptureSearchInput {
    query: string;
    groups: SearchResponseDto[];
    aiGeneratedAt?: string;
}
export interface CaptureSearchResult {
    searchId: string;
    observations: number;
    newSnapshots: number;
    reusedSnapshots: number;
}
export declare class SearchDatasetService {
    captureSearch(input: CaptureSearchInput): Promise<CaptureSearchResult>;
    getTrainingDataset(query: TrainingDatasetQueryDto): Promise<TrainingDatasetResponseDto>;
    getAnalytics(): Promise<DatasetAnalyticsDto>;
    private normalizeText;
    private slugify;
    private trainingDataWhere;
    private externalOfferId;
    private stateHash;
    private optionalText;
    private optionalNumber;
    private parseDate;
}
export {};
