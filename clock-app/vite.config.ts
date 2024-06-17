/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit(filePath, content) {
      if (path.basename(filePath) === "sprite.svg") {
        return false;
      }
      return content.byteLength < 4096;
    },
  },
  plugins: [react(), imagetools()],
  test: {
    include: ["./app/**/*.test.{ts,tsx}"],
  },
});
