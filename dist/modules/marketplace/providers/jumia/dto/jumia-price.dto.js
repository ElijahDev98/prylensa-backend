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
export {};
//# sourceMappingURL=jumia-price.dto.js.map