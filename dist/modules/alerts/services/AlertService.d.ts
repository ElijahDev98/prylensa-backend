import type { AlertNotificationDto, AlertRuleDto, CreateAlertRuleDto, UpdateAlertRuleDto } from "../dto/AlertDto.js";
export declare class AlertService {
    listTrackedQueries(): Promise<string[]>;
    listRules(userId: string): Promise<AlertRuleDto[]>;
    createRule(input: CreateAlertRuleDto): Promise<AlertRuleDto>;
    updateRule(userId: string, id: string, input: UpdateAlertRuleDto): Promise<AlertRuleDto>;
    deleteRule(userId: string, id: string): Promise<void>;
    evaluateActiveRules(userId?: string): Promise<number>;
    listNotifications(userId: string, limit?: number): Promise<AlertNotificationDto[]>;
    markNotificationRead(userId: string, id: string): Promise<void>;
    private evaluateRule;
    private toRuleDto;
    private toNotificationDto;
    private queryTokens;
    private validateType;
    private normalizeThreshold;
    private typeLabel;
    private description;
}
