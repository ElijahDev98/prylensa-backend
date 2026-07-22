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
export class JumiaDomParser {
    static STORE_TOKEN = "window.__STORE__";
    /**
     * Extracts and parses the embedded Jumia application store from the
     * provided HTML document.
     *
     * @param html - The HTML document returned by Playwright.
     * @returns The parsed and validated Jumia store.
     * @throws Error if the HTML is empty or the embedded store cannot be parsed.
     */
    parse(html) {
        if (!html.trim()) {
            throw new Error("HTML document is empty.");
        }
        const storeObject = this.extractStoreObject(html);
        return this.deserializeStore(storeObject);
    }
    /**
     * Extracts the complete JavaScript object assigned to window.__STORE__.
     */
    extractStoreObject(html) {
        const tokenIndex = html.indexOf(JumiaDomParser.STORE_TOKEN);
        if (tokenIndex === -1) {
            throw new Error("Unable to locate window.__STORE__ inside the HTML document.");
        }
        const assignmentIndex = html.indexOf("=", tokenIndex);
        if (assignmentIndex === -1) {
            throw new Error("Unable to locate assignment operator for window.__STORE__.");
        }
        const objectStart = html.indexOf("{", assignmentIndex);
        if (objectStart === -1) {
            throw new Error("Unable to locate opening brace of window.__STORE__.");
        }
        let depth = 0;
        let inSingleQuote = false;
        let inDoubleQuote = false;
        let inTemplateLiteral = false;
        let escaped = false;
        for (let i = objectStart; i < html.length; i++) {
            const character = html[i];
            if (escaped) {
                escaped = false;
                continue;
            }
            if (character === "\\") {
                escaped = true;
                continue;
            }
            if (!inDoubleQuote && !inTemplateLiteral && character === "'") {
                inSingleQuote = !inSingleQuote;
                continue;
            }
            if (!inSingleQuote && !inTemplateLiteral && character === '"') {
                inDoubleQuote = !inDoubleQuote;
                continue;
            }
            if (!inSingleQuote && !inDoubleQuote && character === "`") {
                inTemplateLiteral = !inTemplateLiteral;
                continue;
            }
            if (inSingleQuote || inDoubleQuote || inTemplateLiteral) {
                continue;
            }
            if (character === "{") {
                depth++;
            }
            else if (character === "}") {
                depth--;
                if (depth === 0) {
                    return html.substring(objectStart, i + 1);
                }
            }
        }
        throw new Error("Failed to determine the closing brace of window.__STORE__.");
    }
    /**
     * Converts the extracted JavaScript object into a runtime object.
     *
     * NOTE:
     * This is an intermediate implementation. In the final phase this method
     * will be replaced with a production-safe JavaScript parser.
     */
    deserializeStore(storeObject) {
        const normalized = this.normalizeStoreObject(storeObject);
        let parsed;
        try {
            parsed = JSON.parse(normalized);
        }
        catch (error) {
            throw new Error(`Failed to deserialize window.__STORE__: ${error instanceof Error ? error.message : String(error)}`);
        }
        this.validateStore(parsed);
        return parsed;
    }
    /**
     * Converts the extracted JavaScript object into valid JSON.
     */
    normalizeStoreObject(storeObject) {
        let normalized = storeObject;
        normalized = this.removeTrailingSemicolon(normalized);
        normalized = this.removeTrailingCommas(normalized);
        normalized = this.normalizeUndefined(normalized);
        normalized = this.normalizeNaN(normalized);
        normalized = this.normalizeInfinity(normalized);
        return normalized;
    }
    /**
     * Removes a trailing semicolon.
     */
    removeTrailingSemicolon(value) {
        return value.trimEnd().replace(/;$/, "");
    }
    /**
     * Removes dangling commas.
     */
    removeTrailingCommas(value) {
        return value.replace(/,\s*([}\]])/g, "$1");
    }
    /**
     * Converts undefined values into null.
     */
    normalizeUndefined(value) {
        return value.replace(/\bundefined\b/g, "null");
    }
    /**
     * Converts NaN into null.
     */
    normalizeNaN(value) {
        return value.replace(/\bNaN\b/g, "null");
    }
    /**
     * Converts Infinity values into null.
     */
    normalizeInfinity(value) {
        return value
            .replace(/\bInfinity\b/g, "null")
            .replace(/\b-Infinity\b/g, "null");
    }
    /**
     * Validates the parsed store.
     */
    validateStore(store) {
        if (!store || typeof store !== "object") {
            throw new Error("Parsed store is invalid.");
        }
        const candidate = store;
        if (!Array.isArray(candidate.products)) {
            throw new Error("window.__STORE__.products is missing or invalid.");
        }
    }
}
//# sourceMappingURL=JumiaDomParser.js.map