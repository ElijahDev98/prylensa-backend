import { writeFile } from "node:fs/promises";
import path from "node:path";

import { JumiaScraper } from "../modules/marketplace/providers/jumia/scraper/JumiaScraper.js";

async function main(): Promise<void> {
  const scraper = new JumiaScraper();

  const html = await scraper.scrape("iphone");

  const filePath = path.resolve(process.cwd(), "jumia.html");

  await writeFile(filePath, html, "utf8");

  console.log(html);

  console.log(`Saved ${html.length.toLocaleString()} bytes.`);
  console.log(`Location: ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
