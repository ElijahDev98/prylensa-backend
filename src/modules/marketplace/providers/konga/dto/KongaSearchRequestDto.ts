/**
 * -----------------------------------------------------------------------------
 * File: KongaSearchRequestDto.ts
 * Module: Marketplace / Konga
 *
 * Description:
 * Represents the request payload sent to the Konga Search API.
 *
 * This DTO mirrors Konga's external API contract and should never be used
 * outside the provider layer.
 *
 * Responsibilities:
 * - Model the Konga search request.
 * - Isolate external API contracts from the domain model.
 * -----------------------------------------------------------------------------
 */

/**
 * Payload sent to the Konga Search API.
 */
export interface KongaSearchRequestDto {
  /**
   * Search index name.
   *
   * Example:
   * catalog_store_konga_ranking
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
}
