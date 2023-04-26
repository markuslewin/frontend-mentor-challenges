import * as dotenv from "dotenv";
import { defineConfig } from "cypress";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      config.env = config.env || {};

      const adviceApi = process.env.PUBLIC_ADVICE_API;
      if (typeof adviceApi !== "string") {
        throw new Error("Missing environment variable PUBLIC_ADVICE_API");
      }
      config.env.PUBLIC_ADVICE_API = adviceApi;

      return config;
    },
  },
});
