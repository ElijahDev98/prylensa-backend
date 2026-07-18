/**
 * -----------------------------------------------------------------------------
 * File: base.repository.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Base repository providing access to the shared Prisma Client.
 * All feature repositories should extend this class.
 * -----------------------------------------------------------------------------
 */

import { prisma } from "../database/index.js";

export abstract class BaseRepository {
  protected readonly prisma = prisma;
}
