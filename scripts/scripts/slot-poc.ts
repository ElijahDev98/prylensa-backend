import axios from "axios";
import * as cheerio from "cheerio";

const SEARCH_QUERY = "Samsung";

async function main(): Promise<void> {
  try {
    const url = `https://slot.ng/catalogsearch/result/?q=${encodeURIComponent(
      SEARCH_QUERY,
    )}`;

    console.log(`Searching SLOT for "${SEARCH_QUERY}"...\n`);

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 15000,
    });

    const html = response.data as string;

    console.log("Status:", response.status);
    console.log("Page Title:", cheerio.load(html)("title").text().trim());

    console.log("Contains Samsung:", html.includes("Samsung"));
    console.log("Contains ₦:", html.includes("₦"));
    console.log("Contains product-item:", html.includes("product-item"));
    console.log("Contains product:", html.includes("product"));
    console.log("Contains catalogsearch:", html.includes("catalogsearch"));

    console.log("\nFirst 1000 characters:\n");
    console.log(html.substring(0, 1000));
  } catch (error) {
    console.error(error);
  }
}

void main();
