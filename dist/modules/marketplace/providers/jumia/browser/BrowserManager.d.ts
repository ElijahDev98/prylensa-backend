import { Browser } from "playwright";
/**
 * Singleton Playwright browser manager.
 *
 * Responsibilities:
 * - Lazily create a browser instance.
 * - Reuse the same browser.
 * - Gracefully close the browser.
 */
export declare class BrowserManager {
    private static browser;
    private constructor();
    /**
     * Returns the shared browser instance.
     */
    static getBrowser(): Promise<Browser>;
    /**
     * Indicates whether a browser has already been created.
     */
    static isInitialized(): boolean;
    /**
     * Gracefully closes the browser.
     */
    static dispose(): Promise<void>;
}
