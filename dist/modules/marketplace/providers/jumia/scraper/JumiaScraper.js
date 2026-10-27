import { BrowserPool } from "../browser/BrowserPool.js";
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
    async scrape(query) {
        const page = await BrowserPool.acquirePage();
        try {
            const url = this.buildSearchUrl(query);
            //   console.log(`[Jumia] Navigating to ${url}`);
            await page.goto(url, {
                waitUntil: "domcontentloaded",
            });
            await this.waitForPage(page);
            const html = await page.content();
            //   console.log(
            //     `[Jumia] HTML downloaded (${html.length.toLocaleString()} bytes)`,
            //   );
            return html;
        }
        finally {
            await BrowserPool.releasePage(page);
        }
    }
    /**
     * Builds the marketplace search URL.
     */
    buildSearchUrl(query) {
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
    async waitForPage(page) {
        await page.waitForTimeout(2_000);
    }
}
//# sourceMappingURL=JumiaScraper.js.map