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
 * - Centralize scraping timeouts.
 * - Prevent browser configuration from leaking into the scraper.
 *
 * This file contains configuration only.
 * -----------------------------------------------------------------------------
 */
const VIEWPORT = {
    width: 1440,
    height: 900,
};
const LAUNCH_OPTIONS = {
    headless: true,
    channel: "chromium",
    args: [
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
        "--disable-extensions",
        "--disable-gpu",
        "--disable-infobars",
        "--disable-notifications",
        "--disable-popup-blocking",
        "--disable-renderer-backgrounding",
        "--no-default-browser-check",
        "--no-first-run",
    ],
};
export const JUMIA_PLAYWRIGHT_CONFIG = {
    browser: {
        launch: LAUNCH_OPTIONS,
    },
    page: {
        viewport: VIEWPORT,
        locale: "en-US",
        timezoneId: "Africa/Lagos",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        extraHTTPHeaders: {
            "Accept-Language": "en-US,en;q=0.9",
        },
    },
    timeout: {
        launch: 30000,
        navigation: 30000,
        selector: 10000,
        scrape: 45000,
    },
    selectors: {
        /**
         * Primary product cards.
         * These selectors are intentionally stored here because
         * marketplace markup changes over time.
         */
        productCards: [
            "article.prd",
            "article[data-id]",
            "div[data-products-spon]",
        ],
        searchInput: "input[name='q']",
    },
};
//# sourceMappingURL=jumia.playwright.config.js.map