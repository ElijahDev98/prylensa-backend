import axios from "axios";
import * as cheerio from "cheerio";
async function main() {
    const url = "https://www.konga.com/search?search=Samsung";
    const response = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
            Accept: "text/html",
        },
    });
    const $ = cheerio.load(response.data);
    console.log("Title:", $("title").text());
    console.log("\nSearching for product links...\n");
    const links = new Set();
    $("a").each((_, element) => {
        const href = $(element).attr("href");
        if (!href) {
            return;
        }
        // Ignore navigation links
        if (href.startsWith("/") &&
            !href.startsWith("/product") &&
            !href.includes("product")) {
            return;
        }
        if (href.includes("product")) {
            links.add(href);
        }
    });
    console.log([...links]);
}
main().catch(console.error);
//# sourceMappingURL=test-konga-discovery.js.map