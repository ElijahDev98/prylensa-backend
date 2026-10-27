/**
 * -----------------------------------------------------------------------------
 * File: prisma.client.ts
 * Project: Prylensa Backend
 * Layer: Shared Database
 *
 * Purpose:
 * Provides a singleton Prisma Client instance for the application.
 * Compatible with Prisma 7 JavaScript Query Engine.
 * -----------------------------------------------------------------------------
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
const globalForPrisma = globalThis;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
//# sourceMappingURL=prisma.client.js.map