function rem(px) {
  return `${px / 16}rem`;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    fontFamily: {
      roboto: "'Roboto', sans-serif",
      "roboto-slab": "'Roboto Slab Variable', serif",
      "roboto-mono": "'Roboto Mono Variable', monospace;",
    },
    fontSize: {
      "heading-m": [rem(15), { lineHeight: rem(18), fontWeight: 400 }],
      "heading-s": [
        rem(14),
        { lineHeight: rem(16), letterSpacing: rem(2), fontWeight: 500 },
      ],
      "body-s": [rem(13), { lineHeight: rem(15), fontWeight: 300 }],
      "preview-h1": [rem(32), { lineHeight: rem(42), fontWeight: 700 }],
      "preview-h2": [rem(28), { lineHeight: rem(37), fontWeight: 300 }],
      "preview-h3": [rem(24), { lineHeight: rem(32), fontWeight: 700 }],
      "preview-h4": [rem(20), { lineHeight: rem(26), fontWeight: 700 }],
      "preview-h5": [rem(16), { lineHeight: rem(21), fontWeight: 700 }],
      "preview-h6": [rem(14), { lineHeight: rem(18), fontWeight: 700 }],
      "preview-paragraph": [rem(14), { lineHeight: rem(24), fontWeight: 400 }],
      "preview-blockquote": [rem(14), { lineHeight: rem(24), fontWeight: 700 }],
      "markdown-code": [rem(14), { lineHeight: rem(24), fontWeight: 400 }],
    },
    colors: {
      body: {
        DEFAULT: "hsl(var(--body))",
        foreground: "hsl(var(--body-foreground))",
      },
    },
    extend: {},
  },
  plugins: [],
};
