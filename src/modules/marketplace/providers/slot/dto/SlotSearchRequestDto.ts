/**
 * -----------------------------------------------------------------------------
 * File: SlotSearchRequestDto.ts
 * Module: Marketplace / Slot
 *
 * Description:
 * Query parameters accepted by the official Slot search endpoint.
 *
 * Endpoint:
 * GET /api/v1/product-search
 * -----------------------------------------------------------------------------
 */

export interface SlotSearchRequestDto {
  /**
   * Product search keyword.
   *
   * Example:
   * samsung
   */
  q: string;

  /**
   * Page number.
   */
  page: number;

  /**
   * Number of products returned per page.
   *
   * Default:
   * 6
   */
  per_page: number;
}
