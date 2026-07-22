import type { Page } from "playwright";
/**
 * BrowserPool
 *
 * Responsible for creating and disposing Playwright pages.
 * Browser lifecycle remains the responsibility of BrowserManager.
 */
export declare class BrowserPool {
    /**
     * Creates a fully configured Playwright page.
     */
    static acquirePage(): Promise<Page>;
    /**
     * Releases a page and its browser context.
     */
    static releasePage(page: Page): Promise<void>;
}
