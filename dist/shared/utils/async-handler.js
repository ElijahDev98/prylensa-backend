/**
 * -----------------------------------------------------------------------------
 * File: async-handler.ts
 * Project: Prylensa Backend
 * Layer: Shared
 *
 * Purpose:
 * Wraps asynchronous Express route handlers and forwards
 * rejected promises to the global error middleware.
 * -----------------------------------------------------------------------------
 */
export function asyncHandler(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
//# sourceMappingURL=async-handler.js.map