import { JumiaProvider } from "../features/search/providers/jumia.provider.js";
async function main() {
    const provider = new JumiaProvider();
    const results = await provider.search("Samsung");
    console.log(results);
}
main().catch(console.error);
//# sourceMappingURL=test-jumia-provider.js.map