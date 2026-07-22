import { Page } from "playwright";

import { BrowserPool } from "../browser/BrowserPool.js";
import { JUMIA_PLAYWRIGHT_CONFIG } from "../config/jumia.playwright.config.js";

/**
 * -----------------------------------------------------------------------------
 * JumiaScraper
 * -----------------------------------------------------------------------------
 *
 * Responsible only for:
 * - Opening the Jumia search page.
 * - Waiting for the rendered page.
 * - Returning the final HTML.
 *
 * No parsing or mapping is performed here.
 * -----------------------------------------------------------------------------
 */
export class JumiaScraper {
  /**
   * Downloads the fully rendered search page.
   *
   * @param query Product search keyword.
   * @returns Rendered HTML.
   */
  public async scrape(query: string): Promise<string> {
    const page = await BrowserPool.acquirePage();

    try {
      const url = this.buildSearchUrl(query);

      console.log(`[Jumia] Navigating to ${url}`);

      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: JUMIA_PLAYWRIGHT_CONFIG.timeout.navigation,
      });

      await this.waitForPage(page);

      const html = await page.content();

      console.log(
        `[Jumia] HTML downloaded (${html.length.toLocaleString()} bytes)`,
      );

      return html;
    } finally {
      await BrowserPool.releasePage(page);
    }
  }

  /**
   * Builds the marketplace search URL.
   */
  private buildSearchUrl(query: string): string {
    const search = new URL("https://www.jumia.com.ng/catalog/");

    search.searchParams.set("q", query);

    return search.toString();
  }

  /**
   * Waits until the page has stabilized.
   *
   * We intentionally avoid assuming a specific selector because
   * Jumia occasionally changes its DOM.
   */
  private async waitForPage(page: Page): Promise<void> {
    try {
      await page.waitForLoadState("networkidle", {
        timeout: 10_000,
      });
    } catch {
      // Ignore timeout.
      // Some pages continuously perform background requests.
    }

    await page.waitForTimeout(2_000);
  }
}
