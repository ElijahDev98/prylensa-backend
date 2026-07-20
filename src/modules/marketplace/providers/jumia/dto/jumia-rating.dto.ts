/**
 * -----------------------------------------------------------------------------
 * Jumia Rating DTO
 * -----------------------------------------------------------------------------
 *
 * Represents customer rating information returned by Jumia.
 *
 * This object is optional because many products do not yet have reviews.
 *
 * The mapper converts this provider-specific object into the Offer domain
 * rating model.
 * -----------------------------------------------------------------------------
 */

export interface JumiaRatingDto {
  /**
   * Average rating.
   *
   * Example:
   * 4.6
   */
  average: number;

  /**
   * Total number of ratings.
   */
  totalRatings: number;
}
