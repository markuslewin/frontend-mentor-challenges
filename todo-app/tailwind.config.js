import { screens } from "./src/utils/screens";
import { clickable } from "./tailwind/clickable";
import { hocus } from "./tailwind/hocus";
import { rem } from "./tailwind/rem";
import { shape } from "./tailwind/shape";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    screens,
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      header: {
        foreground: "hsl(var(--header-foreground))",
      },
      new: {
        DEFAULT: "hsl(var(--new))",
        foreground: "hsl(var(--new-foreground))",
        border: "hsl(var(--new-border))",
      },
      todo: {
        DEFAULT: "hsl(var(--todo))",
        foreground: {
          DEFAULT: "hsl(var(--todo-foreground))",
          fade: "hsl(var(--todo-foreground-fade))",
        },
        border: "hsl(var(--todo-border))",
      },
      filter: {
        foreground: {
          DEFAULT: "hsl(var(--filter-foreground))",
          active: "hsl(var(--filter-foreground-active))",
          hover: "hsl(var(--filter-foreground-hover))",
        },
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
