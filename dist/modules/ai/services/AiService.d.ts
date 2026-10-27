/**
 * -----------------------------------------------------------------------------
 * File: AiService.ts
 * Module: AI
 *
 * Purpose:
 * Connects the backend API to the Prylensa AI service.
 * -----------------------------------------------------------------------------
 */
import type { AiProductAnalysisRequestDto, AiProductAnalysisResponseDto, AiProductComparisonRequestDto, AiProductComparisonResponseDto, AiSemanticGroupingResponseDto } from "../dto/AiAnalysisDto.js";
import type { SearchResponseDto } from "../../marketplace/dto/SearchResponseDto.js";
export interface AiTrainingDatasetExportDto {
    version: string;
    dataset_strategy: string;
    generated_at: string;
    source_record_count: number;
    record_count: number;
    feature_columns: string[];
    target_column: string;
    records: Array<Record<string, unknown>>;
}
export declare class AiService {
    private readonly maxAnalysisGroups;
    private readonly client;
    isHealthy(): Promise<boolean>;
    analyzeProduct(request: AiProductAnalysisRequestDto): Promise<AiProductAnalysisResponseDto>;
    analyzeMarketplaceGroups(query: string, groups: SearchResponseDto[]): Promise<AiProductAnalysisResponseDto>;
    refineMarketplaceGroups(groups: SearchResponseDto[]): Promise<AiSemanticGroupingResponseDto>;
    compareProducts(request: AiProductComparisonRequestDto): Promise<AiProductComparisonResponseDto>;
    retrainRecommendationFeedbackModel(): Promise<void>;
    exportTrainingDataset(query?: string, maximumRecords?: number): Promise<AiTrainingDatasetExportDto>;
}
