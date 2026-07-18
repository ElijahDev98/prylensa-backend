import axios from "axios";
import * as cheerio from "cheerio";

async function main() {
  const response = await axios.get(
    "https://www.konga.com/search?search=Samsung",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
      },
    },
  );

  const $ = cheerio.load(response.data);

  $("img").each((index, element) => {
    const alt = $(element).attr("alt");
    const src = $(element).attr("src");

    if (
      alt?.toLowerCase().includes("samsung") ||
      src?.toLowerCase().includes("samsung")
    ) {
      console.log("=================================");
      console.log($.html($(element).parent()));
      process.exit(0);
    }
  });

  console.log("Samsung image not found.");
}

void main();
