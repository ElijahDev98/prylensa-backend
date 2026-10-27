import { prisma } from "../../../shared/database/index.js";
export class ComparisonWorkspaceService {
    async get(userId) {
        const workspace = await prisma.comparisonWorkspace.findUnique({ where: { userId } });
        return Array.isArray(workspace?.items) ? workspace.items : [];
    }
    async save(userId, items) {
        if (!Array.isArray(items) || items.length > 4) {
            throw new Error("A comparison workspace must contain between 0 and 4 products.");
        }
        const sanitized = items.filter((item) => typeof item === "object" && item !== null && typeof item.id === "string");
        if (sanitized.length !== items.length)
            throw new Error("Invalid comparison product data.");
        const workspace = await prisma.comparisonWorkspace.upsert({
            where: { userId },
            create: { userId, items: sanitized },
            update: { items: sanitized },
        });
        return workspace.items;
    }
}
//# sourceMappingURL=ComparisonWorkspaceService.js.map