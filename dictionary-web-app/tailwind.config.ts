import type { Config } from "tailwindcss";

function rem(px: number) {
  return `${px / 16}rem`;
}

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      base: "var(--font)",
    },
    fontSize: {
      "heading-l": [rem(64), { fontWeight: 700, lineHeight: rem(77) }],
      "heading-m": [rem(24), { fontWeight: 400, lineHeight: rem(29) }],
      "heading-s": [rem(20), { fontWeight: 400, lineHeight: rem(24) }],
      "body-m": [rem(18), { fontWeight: 400, lineHeight: rem(24) }],
      "body-s": [rem(14), { fontWeight: 400, lineHeight: rem(17) }],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
