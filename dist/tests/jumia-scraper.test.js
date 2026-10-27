import assert from "node:assert/strict";
import test from "node:test";
import { JumiaScraper } from "../modules/marketplace/providers/jumia/scraper/JumiaScraper.js";
test("Jumia live scraper returns marketplace HTML", {
    skip: process.env.RUN_LIVE_MARKETPLACE_TESTS !== "true",
}, async () => {
    const scraper = new JumiaScraper();
    const html = await scraper.scrape("iphone");
    assert.ok(html.length > 1000);
    assert.match(html.toLowerCase(), /iphone/);
});
//# sourceMappingURL=jumia-scraper.test.js.map