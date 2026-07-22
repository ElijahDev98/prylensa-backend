import { Offer } from "../../../models/Offer.js";
import { SlotProductDto } from "../dto/SlotSearchResponseDto.js";

const imageUrl = `https://api-prod.slot.ng/storage/`;
const productUrl = `https://api-prod.slot.ng/storage/`;

/**
 * Maps Slot API products into the application's
 * shared Offer domain model.
 */
export class SlotOfferMapper {
  /**
   * Converts a collection of Slot products into
   * Offer domain models.
   *
   * @param products Products returned by the Slot API.
   * @returns Array of Offer domain models.
   */
  public static toOffers(products: SlotProductDto[]): Offer[] {
    return products.map((product) => this.toOffer(product));
  }

  /**
   * Converts a single Slot product into
   * an Offer domain model.
   *
   * @param product Slot product.
   * @returns Offer domain model.
   */
  /**
   * Converts a single Slot product into
   * an Offer domain model.
   *
   * @param product Slot product.
   * @returns Offer domain model.
   */
  public static toOffer(product: SlotProductDto): Offer {
    return {
      id: product.id,

      productId: product.sku,

      title: product.name,

      brand: product.brand ?? undefined,

      price: product.price,

      originalPrice: product.original_price ?? undefined,

      currency: "NGN",

      imageUrl: `${imageUrl}${product.image_link}`,

      productUrl: `${productUrl}${product.slug}`,

      marketplace: "Slot",

      inStock: product.status === "in_stock",
    };
  }
}
