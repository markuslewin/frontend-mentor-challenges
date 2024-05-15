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
      base: "'League Spartan Variable', sans-serif",
    },
    /* @link https://utopia.fyi/clamp/calculator?a=375,1024,40—56|37—52|-0.67—-0.93|32—40|-0.53—-0.67|20—28|-0.33—-0.47 */
    fontSize: {
      fcalc: [rem(32), { lineHeight: rem(29), letterSpacing: rem(-0.53) }],
      ftheme: [rem(12), { lineHeight: rem(11), letterSpacing: rem(1) }],
      fscreen: [
        "clamp(2.5rem, 1.9222rem + 2.4653vi, 3.5rem)",
        {
          lineHeight: "clamp(2.3125rem, 1.7708rem + 2.3112vi, 3.25rem)",
          letterSpacing:
            "clamp(-0.0581rem, -0.0325rem + -0.0401vi, -0.0419rem)",
        },
      ],
      fkey: [
        "clamp(2rem, 1.7111rem + 1.2327vi, 2.5rem)",
        {
          lineHeight: rem(40),
          letterSpacing:
            "clamp(-0.0419rem, -0.0281rem + -0.0216vi, -0.0331rem)",
        },
      ],
      "fkey-special": [
        "clamp(1.25rem, 0.9611rem + 1.2327vi, 1.75rem)",
        {
          lineHeight: rem(40),
          letterSpacing:
            "clamp(-0.0294rem, -0.0156rem + -0.0216vi, -0.0206rem)",
        },
      ],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
