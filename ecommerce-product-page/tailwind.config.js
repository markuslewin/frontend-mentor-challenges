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
    colors: {
      // Primary
      orange: "hsl(26 100% 55%)",
      "pale-orange": "hsl(25 100% 94%)",
      // Neutral
      "very-dark-blue": "hsl(220 13% 13%)",
      "dark-grayish-blue": "hsl(219 9% 45%)",
      "grayish-blue": "hsl(220 14% 75%)",
      "light-grayish-blue": "hsl(223 64% 98%)",
      white: "hsl(0 0% 100%)",
      black: "hsl(0 0% 0%)",
    },
    fontFamily: {
      "kumbh-sans": "'Kumbh Sans Variable', sans-serif",
    },
    fontSize: {
      body: [rem(15), { lineHeight: rem(25) }],
      "body-tablet": [rem(16), { lineHeight: rem(26) }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
