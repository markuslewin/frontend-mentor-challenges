import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [preact()],
  adapter: netlify()
});