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

export class JumiaDomParser {
  private static readonly STORE_TOKEN = "window.__STORE__";

  /**
   * Extracts and parses the embedded Jumia application store from the
   * provided HTML document.
   *
   * @param html - The HTML document returned by Playwright.
   * @returns The parsed and validated Jumia store.
   * @throws Error if the HTML is empty or the embedded store cannot be parsed.
   */
  public parse(html: string): JumiaStore {
    if (!html.trim()) {
      throw new Error("HTML document is empty.");
    }

    const storeObject = this.extractStoreObject(html);

    return this.deserializeStore(storeObject);
  }

  /**
   * Extracts the complete JavaScript object assigned to window.__STORE__.
   */
  private extractStoreObject(html: string): string {
    const tokenIndex = html.indexOf(JumiaDomParser.STORE_TOKEN);

    if (tokenIndex === -1) {
      throw new Error(
        "Unable to locate window.__STORE__ inside the HTML document.",
      );
    }

    const assignmentIndex = html.indexOf("=", tokenIndex);

    if (assignmentIndex === -1) {
      throw new Error(
        "Unable to locate assignment operator for window.__STORE__.",
      );
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
      } else if (character === "}") {
        depth--;

        if (depth === 0) {
          return html.substring(objectStart, i + 1);
        }
      }
    }

    throw new Error(
      "Failed to determine the closing brace of window.__STORE__.",
    );
  }

  /**
   * Converts the extracted JavaScript object into a runtime object.
   *
   * NOTE:
   * This is an intermediate implementation. In the final phase this method
   * will be replaced with a production-safe JavaScript parser.
   */
  private deserializeStore(storeObject: string): JumiaStore {
    // Temporary debugging
    console.log("========== JUMIA STORE ==========");
    console.log(storeObject);
    console.log("=================================");

    const normalized = this.normalizeStoreObject(storeObject);

    let parsed: unknown;

    try {
      parsed = JSON.parse(normalized);
    } catch (error) {
      throw new Error(
        `Failed to deserialize window.__STORE__: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    this.validateStore(parsed);

    return parsed;
  }

  /**
   * Converts the extracted JavaScript object into valid JSON.
   */
  private normalizeStoreObject(storeObject: string): string {
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
  private removeTrailingSemicolon(value: string): string {
    return value.trimEnd().replace(/;$/, "");
  }

  /**
   * Removes dangling commas.
   */
  private removeTrailingCommas(value: string): string {
    return value.replace(/,\s*([}\]])/g, "$1");
  }

  /**
   * Converts undefined values into null.
   */
  private normalizeUndefined(value: string): string {
    return value.replace(/\bundefined\b/g, "null");
  }

  /**
   * Converts NaN into null.
   */
  private normalizeNaN(value: string): string {
    return value.replace(/\bNaN\b/g, "null");
  }

  /**
   * Converts Infinity values into null.
   */
  private normalizeInfinity(value: string): string {
    return value
      .replace(/\bInfinity\b/g, "null")
      .replace(/\b-Infinity\b/g, "null");
  }

  /**
   * Validates the parsed store.
   */
  private validateStore(store: unknown): asserts store is JumiaStore {
    if (!store || typeof store !== "object") {
      throw new Error("Parsed store is invalid.");
    }

    const candidate = store as Partial<JumiaStore>;

    if (!Array.isArray(candidate.products)) {
      throw new Error("window.__STORE__.products is missing or invalid.");
    }
  }
}
