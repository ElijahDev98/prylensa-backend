import type { MatchedProduct } from "../models/matched-product.model.js";
import type { Offer } from "../../search/models/offer.model.js";

/**
 * Groups offers that represent the same product.
 *
 * This initial implementation is intentionally simple.
 * It groups offers by their normalized title.
 *
 * In a future milestone this engine will be replaced with
 * an AI-powered semantic matching implementation without
 * affecting the rest of the application.
 */
export class ProductMatchingEngine {
  /**
   * Groups offers into matched products.
   *
   * @param offers Normalized offers collected from providers.
   *
   * @returns Matched products.
   */
  public match(offers: Offer[]): MatchedProduct[] {
    const groups = new Map<string, Offer[]>();

    for (const offer of offers) {
      const key = this.normalizeTitle(offer.title);

      const existing = groups.get(key);

      if (existing) {
        existing.push(offer);
      } else {
        groups.set(key, [offer]);
      }
    }

    return Array.from(groups.entries()).map(([id, groupedOffers]) => {
      const firstOffer = groupedOffers.at(0);

      if (!firstOffer) {
        throw new Error("Matched product must contain at least one offer.");
      }

      return {
        id,
        title: firstOffer.title,
        image: firstOffer.image,
        confidence: 1.0,
        offers: groupedOffers,
      };
    });
  }

  /**
   * Produces a normalized title used for temporary grouping.
   *
   * NOTE:
   * This is a placeholder implementation and will be replaced
   * by AI semantic matching in a later milestone.
   */
  private normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
}
