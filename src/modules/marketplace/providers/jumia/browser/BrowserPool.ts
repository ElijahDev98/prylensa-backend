import type { BrowserContext, Page } from "playwright";

import { BrowserManager } from "./BrowserManager.js";
import { JUMIA_PLAYWRIGHT_CONFIG } from "../config/jumia.playwright.config.js";

/**
 * BrowserPool
 *
 * Responsible for creating and disposing Playwright pages.
 * Browser lifecycle remains the responsibility of BrowserManager.
 */
export class BrowserPool {
  /**
   * Creates a fully configured Playwright page.
   */
  public static async acquirePage(): Promise<Page> {
    const browser = await BrowserManager.getBrowser();

    const context: BrowserContext = await browser.newContext({
      viewport: JUMIA_PLAYWRIGHT_CONFIG.page.viewport,
      locale: JUMIA_PLAYWRIGHT_CONFIG.page.locale,
      timezoneId: JUMIA_PLAYWRIGHT_CONFIG.page.timezoneId,
      userAgent: JUMIA_PLAYWRIGHT_CONFIG.page.userAgent,
      extraHTTPHeaders: JUMIA_PLAYWRIGHT_CONFIG.page.extraHTTPHeaders,
    });

    const page = await context.newPage();

    page.setDefaultNavigationTimeout(0);
    page.setDefaultTimeout(0);

    return page;
  }

  /**
   * Releases a page and its browser context.
   */
  public static async releasePage(page: Page): Promise<void> {
    const context = page.context();

    await page.close();

    await context.close();
  }
}
