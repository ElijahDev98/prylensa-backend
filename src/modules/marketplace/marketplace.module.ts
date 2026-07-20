/**
 * -----------------------------------------------------------------------------
 * File: marketplace.module.ts
 * Module: Marketplace
 *
 * Description:
 * Marketplace feature composition root.
 *
 * Responsibilities:
 * - Instantiate marketplace providers.
 * - Configure repository.
 * - Configure service.
 * - Configure controller.
 * - Export the configured controller.
 *
 * Notes:
 * - This is the only file responsible for wiring Marketplace dependencies.
 * - No business logic should exist here.
 * -----------------------------------------------------------------------------
 */

import { MarketplaceController } from "./controllers/MarketplaceController.js";
import { MarketplaceService } from "./services/MarketplaceService.js";
import { MarketplaceRepository } from "./repositories/MarketplaceRepository.js";

import { JumiaProvider } from "./providers/jumia/JumiaProvider.js";
import { KongaProvider } from "./providers/konga/KongaProvider.js";
import { SlotProvider } from "./providers/slot/SlotProvider.js";

/**
 * Registered marketplace providers.
 *
 * Adding a new marketplace only requires
 * registering it here.
 */
const providers = [
  new KongaProvider(),
  new SlotProvider(),
  new JumiaProvider(),
];

/**
 * Repository.
 */
const repository = new MarketplaceRepository(providers);

/**
 * Service.
 */
const service = new MarketplaceService(repository);

/**
 * Marketplace controller.
 */
export const marketplaceController = new MarketplaceController(service);
