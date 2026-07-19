/**
 * Represents a single product returned by the
 * Slot search endpoint.
 */
export interface SlotProductDto {
  id: number;

  name: string;

  sku: string;

  slug: string;

  brand: string;

  short_description: string;

  original_price: number;

  price: number;

  discount_percentage: number;

  image_link: string;

  status: string;

  quantity: number;
}

/**
 * Pagination metadata returned by the
 * Slot search endpoint.
 */
export interface SlotMetaDto {
  current_page: number;

  last_page: number;

  per_page: number;

  total: number;
}

/**
 * Pagination links returned by the
 * Slot search endpoint.
 */
export interface SlotLinksDto {
  first: string;

  last: string;

  next: string | null;
}

/**
 * Complete response returned by the
 * Slot product search endpoint.
 *
 * Endpoint:
 * GET /api/v1/product-search
 */
export interface SlotSearchResponseDto {
  success: boolean;

  data: SlotProductDto[];

  meta: SlotMetaDto;

  links: SlotLinksDto;
}
