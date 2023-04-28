const rem = (px) => `${px / 16}rem`;

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
    extend: {},
  },
  variants: {},
  plugins: [],
};
