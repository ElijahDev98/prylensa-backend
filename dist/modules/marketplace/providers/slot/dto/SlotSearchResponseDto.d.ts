/**
 * -----------------------------------------------------------------------------
 * File: SlotSearchResponseDto.ts
 * Module: Marketplace / Slot
 *
 * Description:
 * DTOs representing the response returned by the official Slot search API.
 *
 * Endpoint:
 * GET /api/v1/product-search
 * -----------------------------------------------------------------------------
 */
/**
 * Product label returned by Slot.
 */
export interface SlotLabelDto {
    name: string | null;
    background_color: string | null;
    label_color: string | null;
}
/**
 * Represents a single product returned by the
 * Slot search endpoint.
 */
export interface SlotProductDto {
    /**
     * Slot uses ULIDs instead of numeric identifiers.
     */
    id: string;
    name: string;
    sku: string;
    slug: string;
    /**
     * Brand is optional.
     */
    brand: string | null;
    short_description: string;
    /**
     * Can be null when no previous price exists.
     */
    original_price: number | null;
    price: number;
    /**
     * Can be null when no discount is applied.
     */
    discount_percentage: number | null;
    image_link: string;
    /**
     * Present in the API although not currently used
     * by the mapper.
     */
    label: SlotLabelDto;
    status: string;
    quantity: number;
}
/**
 * Pagination metadata returned by the
 * Slot search endpoint.
 */
export interface SlotMetaDto {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
/**
 * Pagination links returned by the
 * Slot search endpoint.
 */
export interface SlotLinksDto {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}
/**
 * Complete response returned by the
 * Slot product search endpoint.
 */
export interface SlotSearchResponseDto {
    success: boolean;
    data: SlotProductDto[];
    meta: SlotMetaDto;
    links: SlotLinksDto;
}
