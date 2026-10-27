import { Offer } from "../../../models/Offer.js";
import { SlotProductDto } from "../dto/SlotSearchResponseDto.js";

const SLOT_STORAGE_URL = "https://api-prod.slot.ng/storage/";
const SLOT_PUBLIC_PRODUCT_URL = "https://slot.ng/products/";

function trimLeadingSlashes(value: string): string {
  return value.replace(/^\/+/, "");
}

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
    const reportedDiscount = product.discount_percentage;
    const discountPercentage =
      reportedDiscount !== null &&
      Number.isFinite(reportedDiscount) &&
      reportedDiscount > 0 &&
      reportedDiscount < 100
        ? reportedDiscount
        : undefined;
    const reportedOriginalPrice = product.original_price;
    const originalPrice =
      reportedOriginalPrice !== null && reportedOriginalPrice > product.price
        ? reportedOriginalPrice
        : discountPercentage
          ? product.price / (1 - discountPercentage / 100)
          : undefined;

    return {
      id: product.id,

      productId: product.sku,

      title: product.name,

      brand: product.brand ?? undefined,

      price: product.price,

      originalPrice,

      discountPercentage,

      currency: "NGN",

      imageUrl: `${SLOT_STORAGE_URL}${trimLeadingSlashes(product.image_link)}`,

      productUrl: `${SLOT_PUBLIC_PRODUCT_URL}${trimLeadingSlashes(product.slug)}`,

      marketplace: "Slot",

      inStock: product.status === "in_stock",
    };
  }
}
