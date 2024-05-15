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
      // todo: Add colors
      main: {
        DEFAULT: "hsl(var(--main))",
        foreground: "hsl(var(--main-foreground))",
      },
      toggle: {
        DEFAULT: "hsl(var(--toggle))",
        foreground: "hsl(var(--toggle-foreground))",
      },
      keypad: {
        DEFAULT: "hsl(var(--keypad))",
      },
      screen: {
        DEFAULT: "hsl(var(--screen))",
        foreground: "hsl(var(--screen-foreground))",
      },
      "key-default": {
        DEFAULT: "hsl(var(--key-default))",
        foreground: "hsl(var(--key-default-foreground))",
        shadow: "hsl(var(--key-default-shadow))",
      },
      "key-reset": {
        DEFAULT: "hsl(var(--key-reset))",
        foreground: "hsl(var(--key-reset-foreground))",
        shadow: "hsl(var(--key-reset-shadow))",
      },
      "key-equals": {
        DEFAULT: "hsl(var(--key-equals))",
        foreground: "hsl(var(--key-equals-foreground))",
        shadow: "hsl(var(--key-equals-shadow))",
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
