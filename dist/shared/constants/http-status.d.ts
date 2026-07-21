/**
 * -----------------------------------------------------------------------------
 * File: http-status.ts
 * Project: Priciq Backend
 * Layer: Shared
 *
 * Purpose:
 * Centralized HTTP status codes.
 * -----------------------------------------------------------------------------
 */
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
};
