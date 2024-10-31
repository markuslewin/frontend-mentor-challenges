import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { calculateClamp } from "utopia-core";

function rem(px: number) {
  return `${px / 16}rem`;
}

function em(fraction: number) {
  return `${fraction}em`;
}

function clamp(minSize: number, maxSize: number) {
  return calculateClamp({
    minWidth: 375,
    maxWidth: 768,
    minSize,
    maxSize,
  });
}

const hocus = plugin((p) => {
  p.addVariant("hocus", ["&:hover", "&:focus-visible"]);
  p.addVariant("group-hocus", [
    ":merge(.group):hover &",
    ":merge(.group):focus-visible &",
  ]);
  p.addVariant("peer-hocus", [
    ":merge(.peer):hover ~ &",
    ":merge(.peer):focus-visible ~ &",
  ]);
});

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      // Primary
      peach: "hsl(11 73% 66%)",
      black: "hsl(270 3% 11%)",
      white: "hsl(0 0% 100%)",
      // Secondary
      "light-peach": "hsl(11 100% 80%)",
      "dark-grey": "hsl(264 5% 20%)",
      "light-grey": "hsl(210 17% 95%)",
    },
    fontSize: {
      h1: [
        clamp(32, 48),
        {
          fontWeight: 500,
          lineHeight: clamp(36, 48),
        },
      ],
      h2: [
        clamp(32, 40),
        {
          fontWeight: 500,
          letterSpacing: em(2 / 40),
          lineHeight: clamp(36, 48),
        },
      ],
      h3: [
        rem(20),
        {
          fontWeight: 500,
          letterSpacing: em(5 / 20),
          lineHeight: rem(26),
        },
      ],
      body: [
        rem(16),
        {
          fontWeight: 400,
          lineHeight: rem(26),
        },
      ],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-jost)", ...fontFamily.sans],
      },
    },
  },
  plugins: [hocus],
} satisfies Config;
