/**
 * -----------------------------------------------------------------------------
 * Jumia Price DTO
 * -----------------------------------------------------------------------------
 *
 * Represents the pricing information returned by Jumia's search fragment.
 *
 * This DTO mirrors the provider response and must remain provider-specific.
 * It should never contain business logic or application-specific
 * transformations.
 *
 * Architecture:
 *
 * Jumia HTML
 *      │
 *      ▼
 * Embedded JSON
 *      │
 *      ▼
 * JumiaPriceDto
 *      │
 *      ▼
 * JumiaOfferMapper
 *      │
 *      ▼
 * Offer Domain Model
 * -----------------------------------------------------------------------------
 */

export interface JumiaPriceDto {
  /**
   * Raw numeric price returned by Jumia.
   *
   * Example:
   * "86895.00"
   */
  rawPrice: string;

  /**
   * Localized display price.
   *
   * Example:
   * "₦ 86,895"
   */
  price: string;

  /**
   * Internal Euro conversion used by Jumia.
   */
  priceEuro?: string;

  /**
   * Internal tax value.
   */
  taxEuro?: string;

  /**
   * Original price before discount.
   */
  oldPrice?: string;

  /**
   * Original Euro price.
   */
  oldPriceEuro?: string;

  /**
   * Discount percentage.
   *
   * Example:
   * "30%"
   */
  discount?: string;

  /**
   * Internal Euro discount.
   */
  discountEuro?: string;
}
