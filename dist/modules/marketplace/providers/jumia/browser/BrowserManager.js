import { chromium } from "playwright";
import { JUMIA_PLAYWRIGHT_CONFIG } from "../config/jumia.playwright.config.js";
/**
 * Singleton Playwright browser manager.
 *
 * Responsibilities:
 * - Lazily create a browser instance.
 * - Reuse the same browser.
 * - Gracefully close the browser.
 */
export class BrowserManager {
    static browser = null;
    constructor() { }
    /**
     * Returns the shared browser instance.
     */
    static async getBrowser() {
        if (BrowserManager.browser !== null) {
            return BrowserManager.browser;
        }
        BrowserManager.browser = await chromium.launch(JUMIA_PLAYWRIGHT_CONFIG.browser.launch);
        return BrowserManager.browser;
    }
    /**
     * Indicates whether a browser has already been created.
     */
    static isInitialized() {
        return BrowserManager.browser !== null;
    }
    /**
     * Gracefully closes the browser.
     */
    static async dispose() {
        if (BrowserManager.browser === null) {
            return;
        }
        await BrowserManager.browser.close();
        BrowserManager.browser = null;
    }
}
//# sourceMappingURL=BrowserManager.js.map