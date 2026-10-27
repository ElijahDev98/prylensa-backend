import { prisma } from "../../../shared/database/index.js";
import { notificationBroker } from "./NotificationBroker.js";
const RULE_TYPES = new Set([
    "price-drop",
    "price-increase",
    "quality-improvement",
    "best-price-change",
    "restock",
]);
const MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE = 80;
export class AlertService {
    async listTrackedQueries() {
        const rules = await prisma.priceAlert.findMany({
            where: { enabled: true, status: { in: ["ACTIVE", "TRIGGERED"] } },
            select: { productQuery: true },
            distinct: ["productQuery"],
        });
        return rules
            .map((rule) => rule.productQuery.trim())
            .filter((query) => query.length > 0 && query.toLowerCase() !== "all tracked products");
    }
    async listRules(userId) {
        const rules = await prisma.priceAlert.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        return rules.map((rule) => this.toRuleDto(rule));
    }
    async createRule(input) {
        const productQuery = input.productQuery.trim();
        const type = this.validateType(input.type);
        const threshold = this.normalizeThreshold(input.threshold);
        if (!input.userId.trim() || !productQuery) {
            throw new Error("User and product query are required.");
        }
        const rule = await prisma.priceAlert.create({
            data: {
                userId: input.userId.trim(),
                productQuery,
                name: input.name?.trim() || `${productQuery} ${type.replaceAll("-", " ")}`,
                ruleType: type,
                threshold,
                description: this.description(productQuery, type, threshold),
                enabled: true,
                status: "ACTIVE",
            },
        });
        return this.toRuleDto(rule);
    }
    async updateRule(userId, id, input) {
        const existing = await prisma.priceAlert.findFirst({ where: { id, userId } });
        if (!existing)
            throw new Error("Alert rule was not found.");
        const productQuery = input.productQuery?.trim() || existing.productQuery;
        const type = input.type ? this.validateType(input.type) : this.validateType(existing.ruleType);
        const threshold = input.threshold === undefined
            ? existing.threshold
            : this.normalizeThreshold(input.threshold);
        const enabled = input.enabled ?? existing.enabled;
        const rule = await prisma.priceAlert.update({
            where: { id },
            data: {
                name: input.name?.trim() || existing.name,
                productQuery,
                ruleType: type,
                threshold,
                description: this.description(productQuery, type, threshold),
                enabled,
                status: enabled ? "ACTIVE" : "PAUSED",
            },
        });
        return this.toRuleDto(rule);
    }
    async deleteRule(userId, id) {
        const deleted = await prisma.priceAlert.deleteMany({ where: { id, userId } });
        if (deleted.count === 0)
            throw new Error("Alert rule was not found.");
    }
    async evaluateActiveRules(userId) {
        const rules = await prisma.priceAlert.findMany({
            where: {
                enabled: true,
                status: { in: ["ACTIVE", "TRIGGERED"] },
                user: {
                    OR: [
                        { preference: null },
                        { preference: { notificationsEnabled: true } },
                    ],
                },
                ...(userId ? { userId } : {}),
            },
        });
        let triggered = 0;
        for (const rule of rules) {
            const result = await this.evaluateRule(rule.productQuery, this.validateType(rule.ruleType), rule.threshold);
            const evaluatedAt = new Date();
            if (!result) {
                await prisma.priceAlert.update({
                    where: { id: rule.id },
                    data: { lastEvaluatedAt: evaluatedAt },
                });
                continue;
            }
            const existingEvent = await prisma.alertEvent.findUnique({
                where: {
                    alertId_fingerprint: {
                        alertId: rule.id,
                        fingerprint: result.fingerprint,
                    },
                },
            });
            if (existingEvent) {
                await prisma.priceAlert.update({
                    where: { id: rule.id },
                    data: { lastEvaluatedAt: evaluatedAt },
                });
                continue;
            }
            const event = await prisma.alertEvent.create({
                data: {
                    alertId: rule.id,
                    userId: rule.userId,
                    fingerprint: result.fingerprint,
                    title: result.title,
                    message: result.message,
                    productQuery: rule.productQuery,
                    eventType: rule.ruleType,
                    metadata: result.metadata,
                },
            });
            await prisma.priceAlert.update({
                where: { id: rule.id },
                data: {
                    lastEvaluatedAt: evaluatedAt,
                    lastTriggeredAt: event.triggeredAt,
                    status: "TRIGGERED",
                },
            });
            notificationBroker.publish(rule.userId, this.toNotificationDto(event));
            triggered += 1;
        }
        return triggered;
    }
    async listNotifications(userId, limit = 20) {
        const events = await prisma.alertEvent.findMany({
            where: { userId },
            orderBy: { triggeredAt: "desc" },
            take: Math.min(Math.max(limit, 1), 100),
        });
        return events.map((event) => this.toNotificationDto(event));
    }
    async markNotificationRead(userId, id) {
        const updated = await prisma.alertEvent.updateMany({
            where: { id, userId },
            data: { readAt: new Date() },
        });
        if (updated.count === 0)
            throw new Error("Notification was not found.");
    }
    async evaluateRule(productQuery, type, threshold) {
        const tokens = this.queryTokens(productQuery);
        const listings = await prisma.marketplaceListing.findMany({
            where: tokens.length > 0
                ? { AND: tokens.map((token) => ({ normalizedTitle: { contains: token } })) }
                : undefined,
            include: {
                snapshots: {
                    orderBy: { lastObservedAt: "desc" },
                    take: 2,
                },
            },
            take: 100,
        });
        const candidates = listings
            .map((listing) => ({ listing, current: listing.snapshots[0], previous: listing.snapshots[1] }))
            .filter((item) => item.current !== undefined);
        if (candidates.length === 0)
            return null;
        if (type === "best-price-change") {
            const currentBest = [...candidates].sort((left, right) => Number(left.current?.price ?? 0) - Number(right.current?.price ?? 0))[0];
            const previousBest = candidates
                .filter((item) => item.previous)
                .sort((left, right) => Number(left.previous?.price ?? 0) - Number(right.previous?.price ?? 0))[0];
            if (!currentBest?.current || !previousBest?.previous || currentBest.listing.marketplace === previousBest.listing.marketplace)
                return null;
            return {
                fingerprint: `${type}:${currentBest.current.stateHash}`,
                title: `New best marketplace for ${productQuery}`,
                message: `${currentBest.listing.marketplace} now has the lowest observed price at ${currentBest.current.currency} ${Number(currentBest.current.price).toLocaleString()}.`,
                metadata: { marketplace: currentBest.listing.marketplace, price: Number(currentBest.current.price) },
            };
        }
        for (const candidate of candidates) {
            const current = candidate.current;
            const previous = candidate.previous;
            if (!current || !previous)
                continue;
            const previousPrice = Number(previous.price);
            const currentPrice = Number(current.price);
            const change = previousPrice > 0 ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
            const absoluteChange = Math.abs(change);
            if (absoluteChange > MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE)
                continue;
            const ratingImprovement = (current.rating ?? 0) - (previous.rating ?? 0);
            const triggered = (type === "price-drop" && change <= -threshold) ||
                (type === "price-increase" && change >= threshold) ||
                (type === "restock" && !previous.inStock && current.inStock) ||
                (type === "quality-improvement" && ratingImprovement >= Math.max(threshold, 0.1));
            if (!triggered)
                continue;
            const movement = change < 0 ? "dropped" : "increased";
            const message = type === "restock"
                ? `${candidate.listing.title} is back in stock at ${candidate.listing.marketplace}.`
                : type === "quality-improvement"
                    ? `${candidate.listing.title} improved from rating ${previous.rating ?? 0} to ${current.rating ?? 0}.`
                    : `${candidate.listing.title} ${movement} ${absoluteChange.toFixed(1)}% to ${current.currency} ${currentPrice.toLocaleString()} at ${candidate.listing.marketplace}.`;
            return {
                fingerprint: `${type}:${current.stateHash}`,
                title: `${this.typeLabel(type)}: ${productQuery}`,
                message,
                metadata: {
                    marketplace: candidate.listing.marketplace,
                    previousPrice,
                    currentPrice,
                    changePercentage: Number(change.toFixed(2)),
                    inStock: current.inStock,
                },
            };
        }
        return null;
    }
    toRuleDto(rule) {
        return {
            id: rule.id,
            name: rule.name,
            productQuery: rule.productQuery,
            type: this.validateType(rule.ruleType),
            threshold: rule.threshold,
            description: rule.description,
            enabled: rule.enabled,
            createdAt: rule.createdAt.toISOString(),
            lastEvaluatedAt: rule.lastEvaluatedAt?.toISOString() ?? null,
            lastTriggeredAt: rule.lastTriggeredAt?.toISOString() ?? null,
        };
    }
    toNotificationDto(event) {
        return {
            id: event.id,
            alertId: event.alertId,
            title: event.title,
            message: event.message,
            productQuery: event.productQuery,
            eventType: event.eventType,
            read: event.readAt !== null,
            triggeredAt: event.triggeredAt.toISOString(),
        };
    }
    queryTokens(query) {
        if (query.trim().toLowerCase() === "all tracked products")
            return [];
        return query.toLowerCase().match(/[a-z0-9]+/g)?.filter((token) => token.length >= 2) ?? [];
    }
    validateType(value) {
        if (!RULE_TYPES.has(value))
            throw new Error("Unsupported alert rule type.");
        return value;
    }
    normalizeThreshold(value) {
        return Math.max(Number.isFinite(value) ? Number(value) : 0, 0);
    }
    typeLabel(type) {
        return type.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
    description(query, type, threshold) {
        const conditions = {
            "price-drop": `drops by at least ${threshold}%`,
            "price-increase": `increases by at least ${threshold}%`,
            "quality-improvement": "receives a stronger quality signal",
            "best-price-change": "gets a new lowest-price marketplace",
            restock: "returns to stock",
        };
        return `Notify when ${query} ${conditions[type]}.`;
    }
}
//# sourceMappingURL=AlertService.js.map