import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

function rem(px: number) {
  return `${px / 16}rem`;
}

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    maxWidth: {
      column: rem(737),
    },
    fontFamily: {
      base: "var(--font)",
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)",
    },
    fontSize: {
      "heading-l": [rem(64), { fontWeight: 700, lineHeight: rem(77) }],
      "heading-m": [rem(24), { fontWeight: 400, lineHeight: rem(29) }],
      "heading-s": [rem(20), { fontWeight: 400, lineHeight: rem(24) }],
      "body-m": [rem(18), { fontWeight: 400, lineHeight: rem(24) }],
      "body-s": [rem(14), { fontWeight: 400, lineHeight: rem(17) }],
    },
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      field: {
        DEFAULT: "hsl(var(--field))",
        placeholder: "hsl(var(--field-placeholder))",
      },
      menu: {
        DEFAULT: "hsl(var(--menu))",
        shadow: "hsl(var(--menu-shadow))",
      },
      757575: "hsl(var(--color-757575))",
      FFFFFF: "hsl(var(--color-FFFFFF))",
      A445ED: "hsl(var(--color-A445ED))",
      FF5252: "hsl(var(--color-FF5252))",
      transparent: "transparent",
    },
    boxShadow: {
      DEFAULT: `0 ${rem(5)} ${rem(30)}`,
    },
    extend: {},
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          center: (maxWidth) => {
            return {
              boxSizing: "content-box",
              maxWidth,
              marginInline: "auto",
            };
          },
        },
        { values: theme("maxWidth") },
      );
    }),
  ],
} satisfies Config;
