import { prisma } from "../../../shared/database/index.js";

export interface UserSettingsDto {
  currency: "NGN" | "USD" | "GBP";
  notificationsEnabled: boolean;
  theme: "light" | "dark";
  updatedAt: string;
}

export class SettingsService {
  public async get(userId: string): Promise<UserSettingsDto> {
    const preference = await prisma.userPreference.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    return this.toDto(preference);
  }

  public async update(
    userId: string,
    input: { currency?: string; notificationsEnabled?: boolean; theme?: string },
  ): Promise<UserSettingsDto> {
    const currency = input.currency?.toUpperCase();
    if (currency && !["NGN", "USD", "GBP"].includes(currency)) {
      throw new Error("Unsupported currency.");
    }
    const theme = input.theme?.toLowerCase();
    if (theme && !["light", "dark"].includes(theme)) {
      throw new Error("Unsupported theme.");
    }

    const preference = await prisma.userPreference.upsert({
      where: { userId },
      create: {
        userId,
        currency: currency ?? "NGN",
        notificationsEnabled: input.notificationsEnabled ?? true,
        theme: theme ?? "light",
      },
      update: {
        ...(currency ? { currency } : {}),
        ...(input.notificationsEnabled === undefined
          ? {}
          : { notificationsEnabled: input.notificationsEnabled }),
        ...(theme ? { theme } : {}),
      },
    });
    return this.toDto(preference);
  }

  private toDto(preference: {
    currency: string;
    notificationsEnabled: boolean;
    theme: string;
    updatedAt: Date;
  }): UserSettingsDto {
    return {
      currency: preference.currency as UserSettingsDto["currency"],
      notificationsEnabled: preference.notificationsEnabled,
      theme: preference.theme as UserSettingsDto["theme"],
      updatedAt: preference.updatedAt.toISOString(),
    };
  }
}
