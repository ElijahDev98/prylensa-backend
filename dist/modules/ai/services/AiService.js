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
export class AiService {
    maxAnalysisGroups = 250;
    client = axios.create({
        baseURL: env.AI_SERVICE_URL,
        headers: { "X-Internal-API-Key": env.INTERNAL_AI_API_KEY },
        // The first semantic request may initialize the local transformer model.
        timeout: 60000,
    });
    async isHealthy() {
        try {
            await this.client.get("/health");
            return true;
        }
        catch {
            return false;
        }
    }
    async analyzeProduct(request) {
        const query = request.query?.trim();
        if (!query) {
            throw new Error("AI analysis query is required.");
        }
        const response = await this.client.post("/analysis/product", {
            query,
            limit: request.limit ?? 6,
        });
        return response.data;
    }
    async analyzeMarketplaceGroups(query, groups) {
        const groupsForAnalysis = groups.slice(0, this.maxAnalysisGroups);
        const response = await this.client.post("/analysis/groups", {
            query,
            groups: groupsForAnalysis,
            limit: Math.max(groupsForAnalysis.length, 1),
        });
        return response.data;
    }
    async refineMarketplaceGroups(groups) {
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
        const response = await this.client.post("/analysis/grouping", {
            groups: groups.slice(0, this.maxAnalysisGroups),
            similarity_threshold: 0.82,
        });
        return response.data;
    }
    async compareProducts(request) {
        if (request.groups.length < 2 || request.groups.length > 4) {
            throw new Error("AI comparison requires between 2 and 4 products.");
        }
        const response = await this.client.post("/analysis/comparison", request);
        return response.data;
    }
    async retrainRecommendationFeedbackModel() {
        await this.client.post("/training/feedback/train", {});
    }
    async exportTrainingDataset(query, maximumRecords = 50000) {
        const response = await this.client.get("/training/dataset/export", {
            params: {
                maximum_records: Math.min(Math.max(maximumRecords, 1), 50000),
                ...(query ? { query } : {}),
            },
        });
        return response.data;
    }
}
//# sourceMappingURL=AiService.js.map