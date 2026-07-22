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

export interface JumiaStore {
  products: JumiaProductDto[];
}

export interface JumiaProductDto {
  sku: string;
  name: string;
  displayName?: string;
  brand?: string;
  sellerId?: number;

  categories?: string[];

  prices: {
    rawPrice?: string;
    price?: string;
    oldPrice?: string;
    discount?: string;
  };

  rating?: {
    average?: number;
    totalRatings?: number;
  };

  image?: string;
  imageAlt?: string;

  url?: string;

  isBuyable?: boolean;
  isSponsored?: boolean;

  [key: string]: unknown;
}

export class JumiaDomParser {
  private static readonly STORE_TOKEN = "window.__STORE__";

  /**
   * Extracts the Jumia application store.
   */
  public parse(html: string): JumiaStore {
    if (!html.trim()) {
      throw new Error("HTML document is empty.");
    }

    const storeObject = this.extractStoreObject(html);

    const store = this.deserializeStore(storeObject);

    this.validateStore(store);

    return store;
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
   */
  private deserializeStore(storeObject: string): JumiaStore {
    // Phase 1B
    throw new Error("Not implemented.");
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
