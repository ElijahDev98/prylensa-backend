import type { OfferGroup } from "./DeterministicMatcher.js";
/**
 * -----------------------------------------------------------------------------
 * AI Semantic Matcher
 * -----------------------------------------------------------------------------
 *
 * This service is responsible for improving deterministic product matching
 * using Artificial Intelligence.
 *
 * Deterministic matching works well when marketplace listings are similarly
 * formatted, but different marketplaces often describe the same product using
 * different wording.
 *
 * Example:
 *
 * Jumia:
 * Apple iPhone 15 Pro Max 256GB
 *
 * Konga:
 * iPhone 15 PM 256 GB Apple
 *
 * Slot:
 * Apple iPhone 15 ProMax (256GB)
 *
 * Although these titles are different, AI can determine that they represent
 * the same physical product.
 *
 * -----------------------------------------------------------------------------
 * Current Implementation
 * -----------------------------------------------------------------------------
 *
 * This is a placeholder implementation.
 *
 * It simply returns the deterministic groups unchanged.
 *
 * In a later phase this service will communicate with the AI service
 * (FastAPI + Sentence Transformers) to improve matching accuracy.
 */
export declare class AiSemanticMatcher {
    /**
     * Performs semantic verification of grouped marketplace offers.
     *
     * Future implementation:
     *
     * 1. Send deterministic groups to the AI service.
     * 2. Compute semantic similarity.
     * 3. Merge groups that represent the same product.
     * 4. Return refined groups.
     */
    match(groups: readonly OfferGroup[]): Promise<readonly OfferGroup[]>;
}
