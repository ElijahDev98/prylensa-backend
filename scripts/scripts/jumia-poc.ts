import axios from "axios";
import * as cheerio from "cheerio";

const SEARCH_QUERY = "Samsung";

async function main(): Promise<void> {
  try {
    const url = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(
      SEARCH_QUERY,
    )}`;

    console.log(`Searching Jumia for "${SEARCH_QUERY}"...`);

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const products = $("a.core");

    console.log(`Found ${products.length} products\n`);

    products.slice(0, 10).each((_, element) => {
      const product = $(element);

      const title = product.find(".name").text().trim();

      const price = product.find(".prc").text().trim();

      const image =
        product.find("img").attr("data-src") ??
        product.find("img").attr("src") ??
        "";

      const href = product.attr("href") ?? "";

      console.log({
        title,
        price,
        image,
        url: `https://www.jumia.com.ng${href}`,
      });

      console.log("-----------------------------------");
    });
  } catch (error) {
    console.error(error);
  }
}

void main();
