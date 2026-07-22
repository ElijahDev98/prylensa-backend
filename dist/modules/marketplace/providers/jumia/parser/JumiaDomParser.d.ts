/**
 * JumiaDomParser
 *
 * Extracts the embedded window.__STORE__ object from the HTML returned by
 * Playwright and exposes strongly typed access to the Jumia product dataset.
 *
 * Responsibilities:
 *  - Locate window.__STORE__
 *  - Extract the complete JavaScript object literal
 *  - Parse it into a JavaScript object
 *  - Validate the structure
 *  - Return a typed JumiaStore
 *
 * Responsibilities NOT included:
 *  - Playwright
 *  - Network requests
 *  - Offer mapping
 *  - Business logic
 */
import { JumiaProductDto } from "../dto/jumia-product.dto.js";
export interface JumiaStore {
    products: JumiaProductDto[];
}
export declare class JumiaDomParser {
    private static readonly STORE_TOKEN;
    /**
     * Extracts and parses the embedded Jumia application store from the
     * provided HTML document.
     *
     * @param html - The HTML document returned by Playwright.
     * @returns The parsed and validated Jumia store.
     * @throws Error if the HTML is empty or the embedded store cannot be parsed.
     */
    parse(html: string): JumiaStore;
    /**
     * Extracts the complete JavaScript object assigned to window.__STORE__.
     */
    private extractStoreObject;
    /**
     * Converts the extracted JavaScript object into a runtime object.
     *
     * NOTE:
     * This is an intermediate implementation. In the final phase this method
     * will be replaced with a production-safe JavaScript parser.
     */
    private deserializeStore;
    /**
     * Converts the extracted JavaScript object into valid JSON.
     */
    private normalizeStoreObject;
    /**
     * Removes a trailing semicolon.
     */
    private removeTrailingSemicolon;
    /**
     * Removes dangling commas.
     */
    private removeTrailingCommas;
    /**
     * Converts undefined values into null.
     */
    private normalizeUndefined;
    /**
     * Converts NaN into null.
     */
    private normalizeNaN;
    /**
     * Converts Infinity values into null.
     */
    private normalizeInfinity;
    /**
     * Validates the parsed store.
     */
    private validateStore;
}
