import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [preact({ compat: true })],
  vite: {
    ssr: {
      noExternal: "@conform-to/react",
    },
  },
});
