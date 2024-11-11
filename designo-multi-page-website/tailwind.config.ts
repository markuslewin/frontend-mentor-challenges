import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { calculateClamp } from "utopia-core";
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
      // Other
      service: [
        clamp(28, 40),
        {
          fontWeight: 500,
          letterSpacing: em(2 / 40),
          lineHeight: clamp(36, 48),
        },
      ],
    },
    borderRadius: {
      inherit: "inherit",
      none: "0px",
      DEFAULT: rem(15),
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-jost)", ...fontFamily.sans],
      },
      backgroundImage: {
        "bg-pattern-three-circles":
          "url('../app/_assets/bg-pattern-three-circles.svg')",
        "bg-pattern-design-pages-intro-mobile":
          "url('../app/_assets/bg-pattern-design-pages-intro-mobile.svg')",
        "bg-pattern-design-pages-intro-tablet":
          "url('../app/_assets/bg-pattern-design-pages-intro-tablet.svg')",
        "bg-pattern-intro-app":
          "url('../app/_assets/bg-pattern-intro-app.svg')",
        "bg-pattern-intro-graphic":
          "url('../app/_assets/bg-pattern-intro-graphic.svg')",
        "bg-pattern-intro-web":
          "url('../app/_assets/bg-pattern-intro-web.svg')",
        "bg-pattern-hero-contact-mobile":
          "url('../app/contact/_assets/bg-pattern-hero-contact-mobile.svg')",
        "bg-pattern-hero-contact-desktop":
          "url('../app/contact/_assets/bg-pattern-hero-desktop.svg')",
      },
    },
  },
  plugins: [hocus, clickable],
} satisfies Config;
