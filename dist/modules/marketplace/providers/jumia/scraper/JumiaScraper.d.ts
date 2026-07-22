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
export declare class JumiaScraper {
    /**
     * Downloads the fully rendered search page.
     *
     * @param query Product search keyword.
     * @returns Rendered HTML.
     */
    scrape(query: string): Promise<string>;
    /**
     * Builds the marketplace search URL.
     */
    private buildSearchUrl;
    /**
     * Waits until the page has stabilized.
     *
     * We intentionally avoid assuming a specific selector because
     * Jumia occasionally changes its DOM.
     */
    private waitForPage;
}
