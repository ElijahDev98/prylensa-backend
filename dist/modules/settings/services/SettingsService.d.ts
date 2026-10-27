export interface UserSettingsDto {
    currency: "NGN" | "USD" | "GBP";
    notificationsEnabled: boolean;
    theme: "light" | "dark";
    updatedAt: string;
}
export declare class SettingsService {
    get(userId: string): Promise<UserSettingsDto>;
    update(userId: string, input: {
        currency?: string;
        notificationsEnabled?: boolean;
        theme?: string;
    }): Promise<UserSettingsDto>;
    private toDto;
}
