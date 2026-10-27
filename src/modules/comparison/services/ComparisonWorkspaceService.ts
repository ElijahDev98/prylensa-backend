import type { Prisma } from "@prisma/client";

import { prisma } from "../../../shared/database/index.js";

export class ComparisonWorkspaceService {
  public async get(userId: string): Promise<unknown[]> {
    const workspace = await prisma.comparisonWorkspace.findUnique({ where: { userId } });
    return Array.isArray(workspace?.items) ? workspace.items : [];
  }

  public async save(userId: string, items: unknown): Promise<unknown[]> {
    if (!Array.isArray(items) || items.length > 4) {
      throw new Error("A comparison workspace must contain between 0 and 4 products.");
    }
    const sanitized = items.filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && typeof (item as { id?: unknown }).id === "string",
    );
    if (sanitized.length !== items.length) throw new Error("Invalid comparison product data.");

    const workspace = await prisma.comparisonWorkspace.upsert({
      where: { userId },
      create: { userId, items: sanitized as Prisma.InputJsonValue },
      update: { items: sanitized as Prisma.InputJsonValue },
    });
    return workspace.items as unknown[];
  }
}
