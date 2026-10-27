export type AlertRuleType = "price-drop" | "price-increase" | "quality-improvement" | "best-price-change" | "restock";
export interface CreateAlertRuleDto {
    userId: string;
    name?: string;
    productQuery: string;
    type: AlertRuleType;
    threshold?: number;
}
export interface UpdateAlertRuleDto {
    name?: string;
    productQuery?: string;
    type?: AlertRuleType;
    threshold?: number;
    enabled?: boolean;
}
export interface AlertRuleDto {
    id: string;
    name: string;
    productQuery: string;
    type: AlertRuleType;
    threshold: number;
    description: string;
    enabled: boolean;
    createdAt: string;
    lastEvaluatedAt: string | null;
    lastTriggeredAt: string | null;
}
export interface AlertNotificationDto {
    id: string;
    alertId: string;
    title: string;
    message: string;
    productQuery: string;
    eventType: string;
    read: boolean;
    triggeredAt: string;
}
