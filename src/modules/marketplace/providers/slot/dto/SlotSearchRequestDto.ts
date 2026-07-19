/**
 * Slot Search Request DTO
 *
 * Represents the query parameters accepted by the
 * Slot product search endpoint.
 *
 * Endpoint:
 * GET /api/v1/products
 */
export interface SlotSearchRequestDto {
  /**
   * Product keyword to search for.
   *
   * Example:
   * "iPhone 17"
   */
  q: string;

  /**
   * Page number for paginated results.
   *
   * Default:
   * 1
   */
  page: number;

  /**
   * Number of products returned per page.
   *
   * Default:
   * 20
   */
  per_page: number;

  /**
   * Optional sort order.
   */
  sort?: string;

  /**
   * Optional minimum price filter.
   */
  min_price?: number;

  /**
   * Optional maximum price filter.
   */
  max_price?: number;
}
