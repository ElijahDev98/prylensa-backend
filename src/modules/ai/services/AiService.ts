/**
 * -----------------------------------------------------------------------------
 * File: AiService.ts
 * Module: AI
 *
 * Purpose:
 * Connects the backend API to the Prylensa AI service.
 * -----------------------------------------------------------------------------
 */

import axios from "axios";

import { env } from "../../../app/config/environment.js";

import type {
  AiProductAnalysisRequestDto,
  AiProductAnalysisResponseDto,
  AiProductComparisonRequestDto,
  AiProductComparisonResponseDto,
  AiSemanticGroupingResponseDto,
} from "../dto/AiAnalysisDto.js";

import type { SearchResponseDto } from "../../marketplace/dto/SearchResponseDto.js";

interface AiServiceResponse<T> {
  data: T;
}

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

export class AiService {
  private readonly maxAnalysisGroups = 250;

  private readonly client = axios.create({
    baseURL: env.AI_SERVICE_URL,
    headers: { "X-Internal-API-Key": env.INTERNAL_AI_API_KEY },
    // The first semantic request may initialize the local transformer model.
    timeout: 60000,
  });

  public async isHealthy(): Promise<boolean> {
    try {
      await this.client.get("/health");
      return true;
    } catch {
      return false;
    }
  }

  public async analyzeProduct(
    request: AiProductAnalysisRequestDto,
  ): Promise<AiProductAnalysisResponseDto> {
    const query = request.query?.trim();

    if (!query) {
      throw new Error("AI analysis query is required.");
    }

    const response = await this.client.post<
      AiProductAnalysisResponseDto,
      AiServiceResponse<AiProductAnalysisResponseDto>
    >("/analysis/product", {
      query,
      limit: request.limit ?? 6,
    });

    return response.data;
  }

  public async analyzeMarketplaceGroups(
    query: string,
    groups: SearchResponseDto[],
  ): Promise<AiProductAnalysisResponseDto> {
    const groupsForAnalysis = groups.slice(0, this.maxAnalysisGroups);

    const response = await this.client.post<
      AiProductAnalysisResponseDto,
      AiServiceResponse<AiProductAnalysisResponseDto>
    >("/analysis/groups", {
      query,
      groups: groupsForAnalysis,
      limit: Math.max(groupsForAnalysis.length, 1),
    });

    return response.data;
  }

  public async refineMarketplaceGroups(
    groups: SearchResponseDto[],
  ): Promise<AiSemanticGroupingResponseDto> {
    if (groups.length < 2) {
      return {
        generated_at: new Date().toISOString(),
        model: "sentence-transformers/all-MiniLM-L6-v2",
        input_group_count: groups.length,
        output_group_count: groups.length,
        merge_count: 0,
        groups,
      };
    }

    const response = await this.client.post<
      AiSemanticGroupingResponseDto,
      AiServiceResponse<AiSemanticGroupingResponseDto>
    >("/analysis/grouping", {
      groups: groups.slice(0, this.maxAnalysisGroups),
      similarity_threshold: 0.82,
    });

    return response.data;
  }

  public async compareProducts(
    request: AiProductComparisonRequestDto,
  ): Promise<AiProductComparisonResponseDto> {
    if (request.groups.length < 2 || request.groups.length > 4) {
      throw new Error("AI comparison requires between 2 and 4 products.");
    }

    const response = await this.client.post<
      AiProductComparisonResponseDto,
      AiServiceResponse<AiProductComparisonResponseDto>
    >("/analysis/comparison", request);

    return response.data;
  }

  public async retrainRecommendationFeedbackModel(): Promise<void> {
    await this.client.post("/training/feedback/train", {});
  }

  public async exportTrainingDataset(
    query?: string,
    maximumRecords = 50000,
  ): Promise<AiTrainingDatasetExportDto> {
    const response = await this.client.get<
      AiTrainingDatasetExportDto,
      AiServiceResponse<AiTrainingDatasetExportDto>
    >("/training/dataset/export", {
      params: {
        maximum_records: Math.min(Math.max(maximumRecords, 1), 50000),
        ...(query ? { query } : {}),
      },
    });

    return response.data;
  }
}
