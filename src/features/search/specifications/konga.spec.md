# Konga Provider Specification

> Version: 1.0
> Status: 🟡 Discovery Completed
> Last Updated: 2026-07-18

---

# 1. Overview

## Provider Name

Konga Nigeria

## Base URL

https://www.konga.com

## Provider Status

Discovery Completed

## Integration Strategy

Pending Validation

## HTTP Client

Axios

## HTML Parser

To Be Determined

---

# 2. Objective

Determine the most reliable mechanism for retrieving live product search results from Konga and transform them into the application's standardized SearchResult model.

---

# 3. Search Endpoint

## HTTP Method

GET

## Search URL

https://www.konga.com/search?search={query}

### Example

https://www.konga.com/search?search=Samsung

---

# 4. Discovery Results

| Test                                | Result  |
| ----------------------------------- | ------- |
| Endpoint Reachable                  | PASS    |
| HTML Retrieved                      | PASS    |
| Search Page Loaded                  | PASS    |
| Search Query Present                | PASS    |
| Price Symbols Present               | PASS    |
| Images Present                      | PASS    |
| Static Product Selectors Identified | NOT YET |
| Embedded JSON Found                 | NO      |
| **NEXT_DATA** Found                 | NO      |

---

# 5. Current Findings

The search endpoint is accessible.

Axios successfully downloads the page.

The returned response is valid HTML.

However, the product structure has not yet been identified.

Further DOM inspection is required before implementing the parser.

---

# 6. Current Architecture Decision

Provider implementation is postponed until discovery is complete.

No production code should be written until product extraction has been validated.

---

# 7. Risks

## Unknown DOM Structure

Current HTML does not expose product information through the previously tested selectors.

## Possible Client-side Rendering

Additional inspection required.

## Possible Internal API

Network inspection required.

---

# 8. Next Investigation

The following questions must be answered:

- Where are product cards rendered?
- Which selector contains the title?
- Which selector contains the price?
- Which selector contains the image?
- Which selector contains the product URL?
- Does the site request an internal API?

---

# 9. Production Strategy

Pending completion of discovery.

Possible outcomes:

- Axios + Cheerio
- Axios + JSON Parser
- Playwright (only if required)

---

# 10. Definition of Done

The provider may only be implemented after:

- Product container identified.
- Title selector identified.
- Price selector identified.
- Image selector identified.
- Product URL identified.
- Extraction validated through a POC.

---

# 11. Change History

| Version | Date       | Description                                                         |
| ------- | ---------- | ------------------------------------------------------------------- |
| 1.0     | 2026-07-18 | Discovery findings documented after successful endpoint validation. |
