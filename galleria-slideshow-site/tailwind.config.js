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
    // colors: {
    //   "moderate-blue": "hsl(238 40% 52%)",
    // },
    // fontFamily: {
    //   base: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    // },
    fontSize: {
      display: [rem(200), { fontWeight: 700, lineHeight: rem(150) }],
      "heading-1": [rem(56), { fontWeight: 700, lineHeight: rem(64) }],
      "heading-2": [rem(24), { fontWeight: 700, lineHeight: rem(29) }],
      "heading-3": [rem(18), { fontWeight: 700, lineHeight: rem(22) }],
      "subheading-1": [rem(15), { fontWeight: 400, lineHeight: rem(19) }],
      "subheading-2": [rem(13), { fontWeight: 400, lineHeight: rem(17) }],
      "link-1": [
        rem(12),
        { fontWeight: 700, lineHeight: rem(15), letterSpacing: rem(2.5) },
      ],
      "link-2": [
        rem(9),
        { fontWeight: 700, lineHeight: rem(11), letterSpacing: rem(2) },
      ],
      body: [rem(14), { fontWeight: 700, lineHeight: rem(28) }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
