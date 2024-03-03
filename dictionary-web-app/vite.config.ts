import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import path from "node:path";

export default defineConfig({
  build: {
    assetsInlineLimit(filePath, content) {
      if (path.basename(filePath) === "sprite.svg") {
        return false;
      }
      return content.byteLength < 4096;
    },
  },
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
});
