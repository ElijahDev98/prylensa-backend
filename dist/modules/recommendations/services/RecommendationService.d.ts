import type { AiProductAnalysisItemDto } from "../../ai/dto/AiAnalysisDto.js";
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
export interface RecommendationFeedbackTrainingDto {
    id: string;
    productKey: string;
    feedback: "helpful" | "not-helpful";
    recordedAt: string;
    features: Record<string, unknown>;
}
export declare class RecommendationService {
    recordSearch(userId: string, query: string, analyses: readonly AiProductAnalysisItemDto[]): Promise<void>;
    list(userId: string, limit?: number): Promise<PersonalizedRecommendationDto[]>;
    feedback(userId: string, id: string, value: string): Promise<void>;
    feedbackTrainingData(): Promise<RecommendationFeedbackTrainingDto[]>;
    private metadata;
    private feedbackHistory;
    private trainingFeatures;
    private priority;
}
