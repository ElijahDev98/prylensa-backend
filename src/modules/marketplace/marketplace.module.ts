/**
 * -----------------------------------------------------------------------------
 * File: marketplace.module.ts
 * Module: Marketplace
 *
 * Description:
 * Composes the Marketplace feature by constructing and wiring together all
 * dependencies required by the Marketplace module.
 *
 * Responsibilities:
 * - Instantiate marketplace providers.
 * - Construct the repository.
 * - Construct the service.
 * - Construct the controller.
 * - Export the configured controller.
 *
 * This file serves as the composition root for the Marketplace module.
 * -----------------------------------------------------------------------------
 */

import { MarketplaceController } from "./controllers/MarketplaceController.js";
import { MarketplaceService } from "./services/MarketplaceService.js";
import { MarketplaceRepository } from "./repositories/MarketplaceRepository.js";

import { KongaProvider } from "./providers/konga/KongaProvider.js";
import { SlotProvider } from "./providers/slot/SlotProvider.js";

/**
 * Registered marketplace providers.
 */
const providers = [new KongaProvider(), new SlotProvider()];

/**
 * Marketplace repository.
 */
const repository = new MarketplaceRepository(providers);

/**
 * Marketplace service.
 */
const service = new MarketplaceService(repository);

/**
 * Marketplace controller.
 */
export const marketplaceController = new MarketplaceController(service);
