import axios from "axios";
import * as cheerio from "cheerio";

import type { Offer } from "../models/offer.model.js";
import type { OfferProvider } from "./offer-provider.interface.js";

/**
 * Retrieves product offers from Jumia Nigeria.
 *
 * The provider is responsible only for data acquisition and
 * normalization into the application's Offer model.
 */
export class JumiaProvider implements OfferProvider {
  /**
   * Name of the provider.
   */
  public readonly store = "Jumia";

  /**
   * Base URL for Jumia Nigeria.
   */
  private static readonly BASE_URL = "https://www.jumia.com.ng";

  /**
   * Searches Jumia for products matching the supplied query.
   *
   * @param query Product search keyword.
   *
   * @returns Normalized Offer objects.
   */
  public async search(query: string): Promise<Offer[]> {
    const url = `${JumiaProvider.BASE_URL}/catalog/?q=${encodeURIComponent(query)}`;

    const response = await axios.get<string>(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    const $ = cheerio.load(response.data);

    const offers: Offer[] = [];

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

      offers.push({
        id: this.createOfferId(href),
        title,
        price: this.parsePrice(currentPriceText),
        currency: "NGN",
        originalPrice: originalPriceText
          ? this.parsePrice(originalPriceText)
          : undefined,
        discountPercentage: this.parseDiscount(discountText),
        ...this.parseRating(ratingText),
        image,
        url: `${JumiaProvider.BASE_URL}${href}`,
        store: this.store,
      });
    });

    return offers;
  }

  /**
   * Converts a formatted price string into a number.
   */
  private parsePrice(value: string): number {
    return Number(value.replace(/[^\d]/g, ""));
  }

  /**
   * Extracts the discount percentage.
   */
  private parseDiscount(value: string): number | undefined {
    const match = value.match(/\d+/);

    return match ? Number(match[0]) : undefined;
  }

  /**
   * Parses product rating and review count.
   */
  private parseRating(value: string): Pick<Offer, "rating" | "reviewCount"> {
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

  /**
   * Generates a stable offer identifier from the product URL.
   */
  private createOfferId(href: string): string {
    return href.split("/").pop()?.replace(".html", "") ?? href;
  }
}
