import axios from "axios";
import * as cheerio from "cheerio";

import type { SearchResult } from "../models/search-result.model.js";
import type { SearchProvider } from "./search-provider.interface.js";

export class JumiaProvider implements SearchProvider {
  private static readonly BASE_URL = "https://www.jumia.com.ng";

  public async search(query: string): Promise<SearchResult[]> {
    const url = `${JumiaProvider.BASE_URL}/catalog/?q=${encodeURIComponent(query)}`;

    const response = await axios.get<string>(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    const $ = cheerio.load(response.data);

    const results: SearchResult[] = [];

    $("article.prd").each((index, element) => {
      const product = $(element);

      const title = product.find("h3.name").text().trim();

      const priceText = product.find("div.prc").text().trim();

      const image =
        product.find("img").attr("data-src") ??
        product.find("img").attr("src") ??
        "";

      const href = product.find("a.core").attr("href") ?? "";

      if (!title || !priceText || !href) {
        return;
      }

      const price = Number(priceText.replace(/[₦,]/g, "").trim());

      results.push({
        id: `jumia-${index}`,
        title,
        price,
        image,
        url: `${JumiaProvider.BASE_URL}${href}`,
        store: "Jumia",
      });
    });

    return results;
  }
}
