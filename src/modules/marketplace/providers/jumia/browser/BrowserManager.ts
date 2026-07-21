import { Browser, chromium } from "playwright";

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
  private static browser: Browser | null = null;

  private constructor() {}

  /**
   * Returns the shared browser instance.
   */
  public static async getBrowser(): Promise<Browser> {
    if (BrowserManager.browser !== null) {
      return BrowserManager.browser;
    }

    BrowserManager.browser = await chromium.launch(
      JUMIA_PLAYWRIGHT_CONFIG.browser.launch,
    );

    return BrowserManager.browser;
  }

  /**
   * Indicates whether a browser has already been created.
   */
  public static isInitialized(): boolean {
    return BrowserManager.browser !== null;
  }

  /**
   * Gracefully closes the browser.
   */
  public static async dispose(): Promise<void> {
    if (BrowserManager.browser === null) {
      return;
    }

    await BrowserManager.browser.close();

    BrowserManager.browser = null;
  }
}
