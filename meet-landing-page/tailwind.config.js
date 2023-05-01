let plugin = require("tailwindcss/plugin");

const rem = (px) => `${px / 16}rem`;
const step = (px) => px / 4;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    colors: {
      "#4D96A9": "hsl(192 37% 48%)",
      "#855FB1": "hsl(268 34% 53%)",
      "#28283D": "hsl(240 21% 20%)",
      "#87879D": "hsl(240 10% 57%)",
      "#8FE3F9": "hsl(192 90% 77%)",
      "#D9B8FF": "hsl(268 100% 86%)",
      "#FAFAFA": "hsl(0 0% 98%)",
      "#FFFFFF": "hsl(0 0% 100%)",
      "#71C0D4": "hsl(192 54% 64%)",
      "#B18BDD": "hsl(267 54% 71%)",
    },
    fontFamily: {
      base: "Red Hat DisplayVariable, sans-serif",
    },
    fontSize: {
      h1: [
        rem(64),
        {
          fontWeight: 900,
          lineHeight: rem(64),
        },
      ],
      h2: [
        rem(40),
        {
          fontWeight: 900,
          lineHeight: rem(44),
        },
      ],
      overline: [
        rem(16),
        {
          fontWeight: 900,
          letterSpacing: rem(4),
          lineHeight: rem(26),
        },
      ],
      body: [
        rem(18),
        {
          fontWeight: 500,
          lineHeight: rem(26),
        },
      ],
      "body-impostor": [
        rem(18),
        {
          fontWeight: 500,
          lineHeight: rem(26),
        },
      ],
      widget: [
        rem(16),
        {
          fontWeight: 900,
          lineHeight: rem(26),
        },
      ],
      "h1-tablet": [
        rem(48),
        {
          fontWeight: 900,
          lineHeight: rem(48),
        },
      ],
      "body-mobile": [
        rem(16),
        {
          fontWeight: 500,
          lineHeight: rem(26),
        },
      ],
      "h1-mobile": [
        rem(40),
        {
          fontWeight: 900,
          lineHeight: rem(44),
        },
      ],
      "h2-mobile": [
        rem(32),
        {
          fontWeight: 900,
          lineHeight: rem(36),
        },
      ],
    },
    backgroundImage: {
      // "hero-left": "url('/src/assets/desktop/image-hero-left.png')",
      // "hero-right": "url('/src/assets/desktop/image-hero-right.png')",
      hero: "url('/src/assets/tablet/image-hero.png')",
      footer: "url('/src/assets/mobile/image-footer.jpg')",
      "footer-tablet": "url('/src/assets/tablet/image-footer.jpg')",
      "footer-desktop": "url('/src/assets/desktop/image-footer.jpg')",
    },
    extend: {
      backgroundSize: {
        [step(152)]: `auto ${rem(152)}`,
        [step(304)]: `auto ${rem(304)}`,
      },
      margin: {
        [step(60)]: rem(60),
      },
      maxWidth: {
        [step(540)]: rem(540),
      },
      padding: {
        [step(200)]: rem(200),
        [step(376)]: rem(376),
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("forced-colors", "@media (forced-colors: active)");
    }),
  ],
};
