/**
 * -----------------------------------------------------------------------------
 * File: jumia.playwright.config.ts
 * Module: Marketplace
 *
 * Description:
 * Central Playwright configuration for the Jumia provider.
 *
 * Responsibilities:
 * - Centralize browser launch configuration.
 * - Centralize page configuration.
 * - Disable browser deadlines for marketplace requests.
 * - Prevent browser configuration from leaking into the scraper.
 *
 * This file contains configuration only.
 * -----------------------------------------------------------------------------
 */
import type { LaunchOptions, ViewportSize } from "playwright";
export declare const JUMIA_PLAYWRIGHT_CONFIG: {
    readonly browser: {
        readonly launch: Readonly<LaunchOptions>;
    };
    readonly page: {
        readonly viewport: Readonly<ViewportSize>;
        readonly locale: "en-US";
        readonly timezoneId: "Africa/Lagos";
        readonly userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
        readonly extraHTTPHeaders: {
            readonly "Accept-Language": "en-US,en;q=0.9";
        };
    };
    readonly selectors: {
        /**
         * Primary product cards.
         * These selectors are intentionally stored here because
         * marketplace markup changes over time.
         */
        readonly productCards: readonly ["article.prd", "article[data-id]", "div[data-products-spon]"];
        readonly searchInput: "input[name='q']";
    };
};
