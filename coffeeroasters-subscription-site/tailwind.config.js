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
      "dark-cyan": "hsl(var(--color-dark-cyan))",
      "dark-grey-blue": "hsl(var(--color-dark-grey-blue))",
      "pale-orange": "hsl(var(--color-pale-orange))",
      "light-cream": "hsl(var(--color-light-cream))",
      grey: "hsl(var(--color-grey))",
      // ---
      "light-cyan": "hsl(179 55% 61%)",
      "darker-grey-blue": "hsl(214 17% 19%)",
    },
    fontFamily: {
      fraunces: [
        "'Fraunces Variable', serif",
        { fontVariationSettings: "'opsz' 9" },
      ],
      barlow: "'Barlow', sans-serif",
    },
    fontSize: {
      "title-alternate-big": [
        "var(--size-40-150)",
        { fontWeight: 900, lineHeight: rem(72) },
      ],
      h1: [
        "var(--size-40-72)",
        {
          fontWeight: 900,
          lineHeight: "var(--leading-40-72)",
        },
      ],
      h2: [
        "var(--size-28-40)",
        {
          fontWeight: 900,
          lineHeight: "var(--leading-28-48)",
        },
      ],
      h3: [
        "var(--size-28-32)",
        {
          fontWeight: 900,
          lineHeight: "var(--leading-32-36)",
        },
      ],
      h4: [rem(24), { fontWeight: 900, lineHeight: rem(32) }],
      "navigation-menu": [
        rem(12),
        { fontWeight: 700, lineHeight: rem(15), letterSpacing: rem(1) },
      ],
      body: [
        "var(--size-15-16)",
        {
          fontWeight: 400,
          lineHeight: "var(--leading-25-26)",
        },
      ],
      "step-number": [rem(72), { fontWeight: 900, lineHeight: rem(72) }],
    },
    borderRadius: {
      xs: rem(6),
      sm: rem(8),
      DEFAULT: rem(10),
    },
    maxWidth: {
      5: rem(445),
      6: rem(540),
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
