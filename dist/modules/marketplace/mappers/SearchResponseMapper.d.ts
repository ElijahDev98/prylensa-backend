/**
 * -----------------------------------------------------------------------------
 * File: SearchResponseMapper.ts
 * Module: Marketplace
 *
 * Description:
 * Maps internal marketplace matching models to API response DTOs.
 *
 * Responsibilities:
 * - Convert OfferGroup models into SearchResponseDto objects.
 * - Hide internal business models from API consumers.
 * - Produce a stable response contract for frontend clients.
 *
 * This mapper intentionally contains no business logic.
 * -----------------------------------------------------------------------------
 */
import type { SearchResponseDto } from "../dto/SearchResponseDto.js";
import type { OfferGroup } from "../services/matching/DeterministicMatcher.js";
export declare class SearchResponseMapper {
    /**
     * Maps a single OfferGroup to a SearchResponseDto.
     *
     * @param group Internal matched offer group.
     * @returns Public API response DTO.
     */
    toDto(group: OfferGroup): SearchResponseDto;
    /**
     * Maps multiple OfferGroups to SearchResponseDtos.
     *
     * @param groups Internal matched offer groups.
     * @returns Collection of API response DTOs.
     */
    toDtoList(groups: readonly OfferGroup[]): SearchResponseDto[];
}
