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
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    const $ = cheerio.load(response.data);

    const results: SearchResult[] = [];

    $("article.prd").each((_, element) => {
      const product = $(element);

      const title = product.find("h3.name").text().trim();

      const currentPriceText = product.find("div.prc").text().trim();

      const originalPriceText = product.find("div.old").text().trim();

      const discountText = product.find("div.bdg._dsct").text().trim();

      const ratingText = product.find("div.rev").text().trim();

      const image =
        product.find("img").attr("data-src") ??
        product.find("img").attr("src") ??
        "";

      const href = product.find("a.core").attr("href") ?? "";

      if (!title || !currentPriceText || !href) {
        return;
      }

      const productUrl = `${JumiaProvider.BASE_URL}${href}`;

      results.push({
        id: this.createProductId(href),
        title,
        price: this.parsePrice(currentPriceText),
        currency: "NGN",
        originalPrice: originalPriceText
          ? this.parsePrice(originalPriceText)
          : undefined,
        discountPercentage: this.parseDiscount(discountText),
        ...this.parseRating(ratingText),
        image,
        url: productUrl,
        store: "Jumia",
      });
    });

    return results;
  }

  private parsePrice(value: string): number {
    return Number(value.replace(/[^\d]/g, ""));
  }

  private parseDiscount(value: string): number | undefined {
    if (!value) {
      return undefined;
    }

    const match = value.match(/\d+/);

    return match ? Number(match[0]) : undefined;
  }

  private parseRating(
    value: string,
  ): Pick<SearchResult, "rating" | "reviewCount"> {
    if (!value) {
      return {};
    }

    const numbers = value.match(/[\d.]+/g);

    if (!numbers) {
      return {};
    }

    if (numbers.length >= 2) {
      return {
        rating: Number(numbers[0]),
        reviewCount: Number(numbers[1]),
      };
    }

    return {
      reviewCount: Number(numbers[0]),
    };
  }

  private createProductId(href: string): string {
    const lastSegment = href.split("/").pop();

    return lastSegment?.replace(".html", "") ?? href;
  }
}
