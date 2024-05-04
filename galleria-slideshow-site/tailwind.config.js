import { screens } from "./src/utils/screens";
import { clickable } from "./tailwind/clickable";
import { hocus } from "./tailwind/hocus";
import { rem } from "./tailwind/rem";
import { shape } from "./tailwind/shape";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens,
    // todo: Add colors
    // colors: {
    //   "moderate-blue": "hsl(238 40% 52%)",
    // },
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
