import axios from "axios";
/**
 * Shared HTTP client for all supported
 * e-commerce providers.
 */
export const httpClient = axios.create({
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    },
});
//# sourceMappingURL=http.client.js.map