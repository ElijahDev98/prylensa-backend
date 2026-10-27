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
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/client").DefaultArgs>;
