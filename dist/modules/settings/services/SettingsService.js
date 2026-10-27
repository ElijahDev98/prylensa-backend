import { prisma } from "../../../shared/database/index.js";
export class SettingsService {
    async get(userId) {
        const preference = await prisma.userPreference.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
        return this.toDto(preference);
    }
    async update(userId, input) {
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
    toDto(preference) {
        return {
            currency: preference.currency,
            notificationsEnabled: preference.notificationsEnabled,
            theme: preference.theme,
            updatedAt: preference.updatedAt.toISOString(),
        };
    }
}
//# sourceMappingURL=SettingsService.js.map