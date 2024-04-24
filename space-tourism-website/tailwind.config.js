import { clickable } from "./tailwind/clickable";
import { hocus } from "./tailwind/hocus";
import { rem } from "./tailwind/rem";
import { shape } from "./tailwind/shape";
import { screens } from "./src/utils/screens";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens,
    colors: {
      "0B0D17": "hsl(230 35% 7%)",
      D0D6F9: "hsl(231 77% 90%)",
      FFFFFF: "hsl(0 0% 100%)",
    },
    fontFamily: {
      bellefair: "'Bellefair', serif",
      "barlow-condensed": "'Barlow Condensed', sans-serif",
      barlow: "'Barlow', sans-serif",
    },
    fontSize: {
      "heading-1": [rem(150), { fontWeight: 400, lineHeight: rem(172) }],
      "heading-2": [rem(100), { fontWeight: 400, lineHeight: rem(115) }],
      "heading-3": [rem(56), { fontWeight: 400, lineHeight: rem(64) }],
      "heading-4": [rem(32), { fontWeight: 400, lineHeight: rem(37) }],
      "heading-5": [
        rem(28),
        { fontWeight: 400, lineHeight: rem(34), letterSpacing: rem(4.72) },
      ],
      "subheading-1": [rem(28), { fontWeight: 400, lineHeight: rem(32) }],
      "subheading-2": [
        rem(14),
        { fontWeight: 400, lineHeight: rem(17), letterSpacing: rem(2.36) },
      ],
      "nav-text": [
        rem(16),
        { fontWeight: 400, lineHeight: rem(19), letterSpacing: rem(2.7) },
      ],
      "body-text": [rem(18), { fontWeight: 400, lineHeight: rem(32) }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
