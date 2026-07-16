import { startServer } from "./app/server.js";

const bootstrap = async (): Promise<void> => {
  try {
    await startServer();
  } catch (error) {
    console.error("Failed to start Priciq Backend.", error);
    process.exit(1);
  }
};

void bootstrap();
