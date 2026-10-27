import { SearchResponseMapper } from "../marketplace/mappers/SearchResponseMapper.js";
import type { AiService } from "../ai/services/AiService.js";
import type { AlertService } from "../alerts/services/AlertService.js";
import type { MarketplaceService } from "../marketplace/services/MarketplaceService.js";
import type { SearchDatasetService } from "../marketplace/services/SearchDatasetService.js";
export declare class IntelligenceMonitoringService {
    private readonly marketplaceService;
    private readonly aiService;
    private readonly datasetService;
    private readonly alertService;
    private readonly mapper;
    private timer;
    private readonly runningQueries;
    constructor(marketplaceService: MarketplaceService, aiService: AiService, datasetService: SearchDatasetService, alertService: AlertService, mapper?: SearchResponseMapper);
    start(): void;
    stop(): void;
    run(): Promise<void>;
}
