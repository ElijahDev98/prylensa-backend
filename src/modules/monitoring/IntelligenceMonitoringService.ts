import { env } from "../../app/config/environment.js";
import { SearchResponseMapper } from "../marketplace/mappers/SearchResponseMapper.js";

import type { AiService } from "../ai/services/AiService.js";
import type { AlertService } from "../alerts/services/AlertService.js";
import type { SearchResponseDto } from "../marketplace/dto/SearchResponseDto.js";
import type { MarketplaceService } from "../marketplace/services/MarketplaceService.js";
import type { SearchDatasetService } from "../marketplace/services/SearchDatasetService.js";

export class IntelligenceMonitoringService {
  private timer: NodeJS.Timeout | null = null;
  private readonly runningQueries = new Set<string>();

  constructor(
    private readonly marketplaceService: MarketplaceService,
    private readonly aiService: AiService,
    private readonly datasetService: SearchDatasetService,
    private readonly alertService: AlertService,
    private readonly mapper = new SearchResponseMapper(),
  ) {}

  public start(): void {
    if (this.timer) return;

    this.timer = setInterval(
      () => void this.run(),
      env.MONITORING_INTERVAL_MS,
    );
    this.timer.unref();

    console.info(
      `[Monitoring] Scheduled every ${Math.round(env.MONITORING_INTERVAL_MS / 60000)} minute(s).`,
    );
  }

  public stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  public async run(): Promise<void> {
    const queries = await this.alertService.listTrackedQueries();

    for (const query of queries) {
      const key = query.toLowerCase();
      if (this.runningQueries.has(key)) continue;
      this.runningQueries.add(key);
      void (async () => {
        try {
          const groups = await this.marketplaceService.search(query, {
            forceRefresh: true,
          });
          const candidates = this.mapper.toDtoList(groups);
          const grouping = await this.aiService.refineMarketplaceGroups(candidates);
          const response = grouping.groups;
          const analysis = await this.aiService.analyzeMarketplaceGroups(
            query,
            response,
          );
          const byId = new Map(
            response.map((group) => [group.comparisonKey, group]),
          );
          const enriched: SearchResponseDto[] = analysis.analyses.flatMap(
            (item) => {
              const group = byId.get(item.id);
              return group ? [{ ...group, aiAnalysis: item }] : [];
            },
          );

          await this.datasetService.captureSearch({
            query,
            groups: enriched,
            aiGeneratedAt: analysis.generated_at,
          });
          await this.alertService.evaluateActiveRules();
        } catch (error) {
          console.error(`[Monitoring] Failed to refresh ${query}.`, error);
        } finally {
          this.runningQueries.delete(key);
        }
      })();
    }

    console.info(`[Monitoring] Started ${queries.length} tracked query refresh(es).`);
  }
}
