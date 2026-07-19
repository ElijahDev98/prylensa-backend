/**
 * -----------------------------------------------------------------------------
 * File: KongaSearchRequestDto.ts
 * Module: Marketplace / Konga Provider
 *
 * Description:
 * Represents the request payload sent to the Konga Search API.
 *
 * This DTO mirrors the external API contract and should remain isolated within
 * the Konga provider layer.
 * -----------------------------------------------------------------------------
 */

export interface KongaSearchRequestDto {
  /**
   * Search index.
   */
  name: string;

  /**
   * Search keyword.
   */
  q: string;

  /**
   * Page number.
   */
  page: number;

  /**
   * Number of results per page.
   */
  hitPerPage: number;

  /**
   * Brand facet.
   */
  facet_by: string;
}
