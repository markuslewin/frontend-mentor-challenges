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
      nav: [rem(18), { lineHeight: rem(26), fontWeight: 700 }],
      "nav-tablet": [rem(15), { lineHeight: rem(26), fontWeight: 400 }],
      subheading: [
        rem(12),
        { lineHeight: rem(12), fontWeight: 700, letterSpacing: rem(1.85) },
      ],
      "subheading-tablet": [
        rem(13),
        { lineHeight: rem(13), fontWeight: 700, letterSpacing: rem(2) },
      ],
      heading: [
        rem(28),
        { lineHeight: rem(32), fontWeight: 700, letterSpacing: 0 },
      ],
      "heading-tablet": [
        rem(44),
        { lineHeight: rem(48), fontWeight: 700, letterSpacing: 0 },
      ],
      "cart-quantity": [rem(10), { lineHeight: rem(10), fontWeight: 700 }],
      "current-price": [rem(28), { lineHeight: rem(28), fontWeight: 700 }],
      discount: [rem(16), { lineHeight: rem(16), fontWeight: 700 }],
      "original-price": [rem(16), { lineHeight: rem(26), fontWeight: 700 }],
      quantity: [rem(16), { lineHeight: rem(16), fontWeight: 700 }],
      "primary-button": [rem(16), { lineHeight: rem(16), fontWeight: 700 }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
