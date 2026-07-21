/**
 * -----------------------------------------------------------------------------
 * File: KongaOfferMapper.ts
 * Module: Marketplace / Konga Provider
 *
 * Description:
 * Maps Konga provider DTOs into the application's Offer domain model.
 *
 * Responsibilities:
 * - Isolate the Konga API contract.
 * - Convert provider-specific fields into Offer.
 * - Contain no networking or business logic.
 * -----------------------------------------------------------------------------
 */
const KONGA_BASE_URL = "https://www.konga.com/product/";
const KONGA_IMAGE_BASE_URL = "https://www-konga-com-res.cloudinary.com/image/upload";
export class KongaOfferMapper {
    /**
     * Maps a single Konga search result into an Offer.
     */
    static toOffer(product) {
        const discountedPrice = product.special_price !== null && product.special_price !== undefined
            ? product.special_price
            : product.price;
        return {
            id: product.objectid,
            productId: product.objectid,
            title: product.name,
            brand: product.brand,
            price: discountedPrice,
            originalPrice: product.special_price != null ? product.price : undefined,
            currency: "NGN",
            imageUrl: product.image_thumbnail_path
                ? `${KONGA_IMAGE_BASE_URL}${product.image_thumbnail_path}`
                : "",
            productUrl: product.url_key ? `${KONGA_BASE_URL}${product.url_key}` : "",
            marketplace: "Konga",
            inStock: product.stock?.in_stock === 1,
            rating: product.rating?.average_rating,
        };
    }
    /**
     * Maps multiple Konga search results.
     */
    static toOffers(products) {
        return products.map((product) => this.toOffer(product));
    }
}
//# sourceMappingURL=KongaOfferMapper.js.map