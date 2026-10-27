import type { AiProductAnalysisItemDto } from "../../ai/dto/AiAnalysisDto.js";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../../shared/database/index.js";

export interface PersonalizedRecommendationDto {
  id: string;
  productKey: string;
  query: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  feedback: "helpful" | "not-helpful" | null;
  updatedAt: string;
}

interface FeedbackHistoryItem {
  feedback: "helpful" | "not-helpful";
  recordedAt: string;
  features: Record<string, unknown>;
}

export interface RecommendationFeedbackTrainingDto {
  id: string;
  productKey: string;
  feedback: "helpful" | "not-helpful";
  recordedAt: string;
  features: Record<string, unknown>;
}

export class RecommendationService {
  public async recordSearch(
    userId: string,
    query: string,
    analyses: readonly AiProductAnalysisItemDto[],
  ): Promise<void> {
    const selectedAnalyses = analyses.slice(0, 8);
    const existingRecords = await prisma.personalizedRecommendation.findMany({
      where: {
        userId,
        productKey: { in: selectedAnalyses.map((analysis) => analysis.id) },
      },
    });
    const existingByProductKey = new Map(
      existingRecords.map((record) => [record.productKey, record]),
    );

    await prisma.$transaction([
      prisma.searchHistory.create({ data: { userId, query } }),
      ...selectedAnalyses.map((analysis) => {
        const existing = existingByProductKey.get(analysis.id);
        const existingMetadata = this.metadata(existing?.metadata);
        const feedbackHistory = this.feedbackHistory(existingMetadata);
        if (existing?.feedback === "helpful" || existing?.feedback === "not-helpful") {
          feedbackHistory.push({
            feedback: existing.feedback,
            recordedAt: existing.updatedAt.toISOString(),
            features: this.trainingFeatures(existingMetadata),
          });
        }
        const metadata = {
          confidence: analysis.confidence_score,
          evaluation: analysis.evaluation_score,
          relevance: analysis.relevance_score,
          savings: analysis.savings_percentage,
          volatility: analysis.price_volatility_score,
          predictionConfidence: analysis.prediction.confidence,
          marketplaceCount: analysis.marketplaces.length,
          risk: analysis.risk_level,
          feedbackHistory,
        };

        return prisma.personalizedRecommendation.upsert({
          where: { userId_productKey: { userId, productKey: analysis.id } },
          create: {
            userId,
            productKey: analysis.id,
            query,
            title: `${analysis.recommendation.action}: ${analysis.title}`,
            description: `${analysis.insight} ${analysis.recommendation.reason}`,
            priority: analysis.recommendation.priority,
            metadata: metadata as unknown as Prisma.InputJsonValue,
          },
          update: {
            query,
            title: `${analysis.recommendation.action}: ${analysis.title}`,
            description: `${analysis.insight} ${analysis.recommendation.reason}`,
            priority: analysis.recommendation.priority,
            metadata: metadata as unknown as Prisma.InputJsonValue,
            feedback: null,
          },
        });
      }),
    ]);
  }

  public async list(userId: string, limit = 20): Promise<PersonalizedRecommendationDto[]> {
    const records = await prisma.personalizedRecommendation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: Math.min(Math.max(limit, 1), 100),
    });
    return records.map((record) => ({
      id: record.id,
      productKey: record.productKey,
      query: record.query,
      title: record.title,
      description: record.description,
      priority: this.priority(record.priority),
      feedback: record.feedback === "helpful" || record.feedback === "not-helpful"
        ? record.feedback
        : null,
      updatedAt: record.updatedAt.toISOString(),
    }));
  }

  public async feedback(userId: string, id: string, value: string): Promise<void> {
    if (!["helpful", "not-helpful"].includes(value)) throw new Error("Unsupported feedback value.");
    const updated = await prisma.personalizedRecommendation.updateMany({
      where: { id, userId },
      data: { feedback: value },
    });
    if (updated.count === 0) throw new Error("Recommendation was not found.");
  }

  public async feedbackTrainingData(): Promise<RecommendationFeedbackTrainingDto[]> {
    const records = await prisma.personalizedRecommendation.findMany({
      orderBy: { updatedAt: "asc" },
      take: 50_000,
    });

    return records.flatMap((record) => {
      const metadata = this.metadata(record.metadata);
      const history = this.feedbackHistory(metadata).map((item, index) => ({
        id: `${record.id}:history:${index}`,
        productKey: record.productKey,
        feedback: item.feedback,
        recordedAt: item.recordedAt,
        features: item.features,
      }));
      if (record.feedback !== "helpful" && record.feedback !== "not-helpful") {
        return history;
      }
      return [
        ...history,
        {
          id: record.id,
          productKey: record.productKey,
          feedback: record.feedback,
          recordedAt: record.updatedAt.toISOString(),
          features: this.trainingFeatures(metadata),
        },
      ];
    });
  }

  private metadata(value: unknown): Record<string, unknown> {
    return value && typeof value === "object" && !Array.isArray(value)
      ? value as Record<string, unknown>
      : {};
  }

  private feedbackHistory(metadata: Record<string, unknown>): FeedbackHistoryItem[] {
    if (!Array.isArray(metadata.feedbackHistory)) return [];
    return metadata.feedbackHistory.flatMap((value) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return [];
      const item = value as Record<string, unknown>;
      const feedback = item.feedback;
      if (feedback !== "helpful" && feedback !== "not-helpful") return [];
      return [{
        feedback,
        recordedAt: String(item.recordedAt ?? ""),
        features: this.metadata(item.features),
      }];
    });
  }

  private trainingFeatures(metadata: Record<string, unknown>): Record<string, unknown> {
    return {
      confidence_score: metadata.confidence ?? 0,
      evaluation_score: metadata.evaluation ?? 0,
      relevance_score: metadata.relevance ?? 0,
      savings_percentage: metadata.savings ?? 0,
      volatility_score: metadata.volatility ?? 0,
      prediction_confidence: metadata.predictionConfidence ?? 0,
      marketplace_count: metadata.marketplaceCount ?? 0,
      risk_score: metadata.risk === "low" ? 0 : metadata.risk === "medium" ? 0.5 : 1,
    };
  }

  private priority(value: string): "high" | "medium" | "low" {
    return value === "high" || value === "medium" ? value : "low";
  }
}
