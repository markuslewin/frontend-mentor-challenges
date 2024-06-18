import { screens } from "./app/utils/screens";
import { center } from "./tailwind/center";
import { clickable } from "./tailwind/clickable";
import { hocus } from "./tailwind/hocus";
import { shape } from "./tailwind/shape";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    screens,
    colors: {
      black: "hsl(0 0% 0%)",
      gray: "hsl(0 0% 19%)",
      white: "hsl(0 0% 100%)",
    },
    fontFamily: {
      base: "'Inter Variable', sans-serif",
    },
    fontSize: {
      h1: [
        "var(--fluid-100-200)",
        { fontWeight: 700, lineHeight: 1, letterSpacing: "-0.025em" },
      ],
      h2: ["var(--fluid-20-56)", { fontWeight: 700, lineHeight: 1.2 }],
      h3: [
        "var(--fluid-15-24)",
        { fontWeight: 700, lineHeight: 1.17, letterSpacing: "0.2em" },
      ],
      h4: ["var(--fluid-15-20)", { lineHeight: 1.4, letterSpacing: "0.2em" }],
      h5: ["var(--fluid-12-18)", { fontWeight: 700, lineHeight: 1.56 }],
      h6: [
        "var(--fluid-10-15)",
        { fontWeight: 700, lineHeight: 1.87, letterSpacing: "0.2em" },
      ],
      body: ["var(--fluid-12-18)", { lineHeight: 1.56 }],
      // ---
      "zone-abbr": ["var(--fluid-15-40)", { fontWeight: 300, lineHeight: 1 }],
      "more-btn": [
        "var(--fluid-12-16)",
        { fontWeight: 700, lineHeight: 1.75, letterSpacing: "0.31em" },
      ],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable, center],
};
