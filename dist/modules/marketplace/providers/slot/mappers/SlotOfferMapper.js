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
    static toOffers(products) {
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
    static toOffer(product) {
        return {
            id: product.id,
            productId: product.sku,
            title: product.name,
            brand: product.brand ?? undefined,
            price: product.price,
            originalPrice: product.original_price ?? undefined,
            currency: "NGN",
            imageUrl: product.image_link,
            productUrl: `https://slot.ng/products/${product.slug}`,
            marketplace: "Slot",
            inStock: product.status === "in_stock",
        };
    }
}
//# sourceMappingURL=SlotOfferMapper.js.map