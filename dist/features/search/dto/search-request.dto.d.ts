/**
 * Represents a search request received from the client.
 */
export interface SearchRequestDto {
    /**
     * Product keyword entered by the user.
     * Example:
     * "Samsung Galaxy S25 Ultra"
     */
    query: string;
}
