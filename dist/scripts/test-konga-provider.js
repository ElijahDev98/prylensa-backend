import { KongaProvider } from "../modules/marketplace/providers/konga/KongaProvider.js";
import axios from "axios";
async function main() {
    try {
        const provider = new KongaProvider();
        console.log("Searching Konga...\n");
        const offers = await provider.search("iPhone 17");
        console.log(`Found ${offers.length} offer(s).\n`);
        console.dir(offers, { depth: null });
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.code);
            console.error(error.message);
            console.error(error.response?.status);
            console.error(error.response?.data);
            console.error(error.cause);
            throw error;
        }
        throw error;
    }
}
main();
//# sourceMappingURL=test-konga-provider.js.map