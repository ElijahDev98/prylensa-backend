/**
 * -----------------------------------------------------------------------------
 * File: prisma.client.ts
 * Project: Priciq Backend
 * Layer: Shared Database
 *
 * Purpose:
 * Provides a singleton Prisma Client instance for the application.
 * -----------------------------------------------------------------------------
 */
import { PrismaClient } from "@prisma/client";
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/client").DefaultArgs>;
