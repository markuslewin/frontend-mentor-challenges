import { screens } from "./app/utils/screens";
import { clickable } from "./tailwind/clickable";
import { hocus } from "./tailwind/hocus";
import { rem } from "./tailwind/rem";
import { shape } from "./tailwind/shape";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    screens,
    colors: {
      // todo: Add colors
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      overlay: "hsl(var(--overlay))",
      menu: {
        DEFAULT: "hsl(var(--menu))",
        foreground: "hsl(var(--menu-foreground))",
      },
      button: {
        DEFAULT: "hsl(var(--button))",
        foreground: "hsl(var(--button-foreground))",
        hocus: "hsl(var(--button-hocus))",
      },
      input: {
        DEFAULT: "hsl(var(--input))",
        "border-hocus": "hsl(var(--input-border-hocus))",
      },
      pill: {
        DEFAULT: "hsl(var(--pill))",
        foreground: "hsl(var(--pill-foreground))",
      },
      delete: {
        foreground: "hsl(var(--delete-foreground))",
        "foreground-hocus": "hsl(var(--delete-foreground-hocus))",
      },
      error: {
        foreground: "hsl(var(--error-foreground))",
      },
    },
    fontFamily: {
      // todo: Add font from Fontsource
      base: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    fontSize: {
      // todo: Add font sizes
      "heading-l": [rem(48), { fontWeight: 500, lineHeight: rem(48) }],
      "heading-m": [rem(39), { fontWeight: 500, lineHeight: rem(39) }],
      body: [rem(20), { lineHeight: rem(24) }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
