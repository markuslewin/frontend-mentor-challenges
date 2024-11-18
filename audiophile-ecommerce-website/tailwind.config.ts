import { type Config } from "tailwindcss";
import { calculateClamp } from "utopia-core";
import plugin from "tailwindcss/plugin";
import { screens } from "./src/app/_utils/screens";

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

const clickable = plugin((p) => {
  p.matchUtilities(
    {
      clickable: (size: string) => {
        return {
          position: "relative",
          isolation: "isolate",
          "&::before": {
            content: "''",
            display: "block",
            width: size,
            height: size,
            position: "absolute",
            "z-index": "-1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        };
      },
    },
    { values: p.theme("size") },
  );
});

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    screens,
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      D87D4A: "hsl(22 65% 57%)",
      "101010": "hsl(0 0% 6%)",
      F1F1F1: "hsl(0 0% 95%)",
      FAFAFA: "hsl(0 0% 98%)",
      fbaf85: "hsl(21 94% 75%)",
      FFFFFF: "hsl(0 0% 100%)",
      "000000": "hsl(0 0% 0%)",
    },
    fontSize: {
      h1: [
        clamp(36, 56),
        {
          fontWeight: 700,
          letterSpacing: em(2 / 56),
          lineHeight: clamp(40, 58),
        },
      ],
      h2: [
        clamp(28, 40),
        {
          fontWeight: 700,
          letterSpacing: em(1.5 / 40),
          lineHeight: clamp(38, 44),
        },
      ],
      h3: [
        clamp(24, 32),
        {
          fontWeight: 700,
          letterSpacing: em(1.15 / 32),
          lineHeight: clamp(36, 36),
        },
      ],
      h4: [
        clamp(28, 28),
        {
          fontWeight: 700,
          letterSpacing: em(2 / 28),
          lineHeight: clamp(38, 38),
        },
      ],
      h5: [
        clamp(24, 24),
        {
          fontWeight: 700,
          letterSpacing: em(1.7 / 24),
          lineHeight: clamp(33, 33),
        },
      ],
      h6: [
        clamp(15, 18),
        {
          fontWeight: 700,
          letterSpacing: em(1.3 / 18),
          lineHeight: clamp(20, 24),
        },
      ],
      overline: [
        clamp(14, 14),
        {
          fontWeight: 400,
          letterSpacing: em(10 / 14),
          lineHeight: clamp(19, 19),
        },
      ],
      "sub-title": [
        clamp(13, 13),
        {
          fontWeight: 700,
          letterSpacing: em(1 / 13),
          lineHeight: clamp(18, 18),
        },
      ],
      body: [
        clamp(15, 15),
        {
          fontWeight: 500,
          lineHeight: clamp(25, 25),
        },
      ],
    },
    borderRadius: {
      DEFAULT: rem(8),
    },
    extend: {},
  },
  plugins: [hocus, clickable],
} satisfies Config;
