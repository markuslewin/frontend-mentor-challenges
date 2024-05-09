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
    fontFamily: {
      antonio: "'Antonio Variable', sans-serif",
      spartan: "'League Spartan Variable', sans-serif",
    },
    fontSize: {
      h1: [rem(80), { lineHeight: rem(103), fontWeight: 500 }],
      h2: [
        rem(40),
        { lineHeight: rem(52), fontWeight: 500, letterSpacing: rem(-1.5) },
      ],
      h3: [
        rem(12),
        { lineHeight: rem(25), fontWeight: 700, letterSpacing: rem(2.6) },
      ],
      h4: [
        rem(11),
        { lineHeight: rem(25), fontWeight: 700, letterSpacing: rem(1) },
      ],
      body: [rem(14), { lineHeight: rem(25), fontWeight: 400 }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
