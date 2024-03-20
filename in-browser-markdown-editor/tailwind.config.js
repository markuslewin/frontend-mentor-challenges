import plugin from "tailwindcss/plugin";

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
      current: "currentColor",
      transparent: "transparent",
      body: {
        DEFAULT: "hsl(var(--body))",
        foreground: "hsl(var(--body-foreground))",
        overlay: "hsl(var(--body-overlay))",
      },
      header: {
        DEFAULT: "hsl(var(--header))",
        foreground: "hsl(var(--header-foreground))",
        muted: "hsl(var(--header-muted))",
        separator: "hsl(var(--header-separator))",
      },
      sidebar: {
        DEFAULT: "hsl(var(--sidebar))",
        foreground: "hsl(var(--sidebar-foreground))",
        active: "hsl(var(--sidebar-active))",
        muted: "hsl(var(--sidebar-muted))",
        inactive: "hsl(var(--sidebar-inactive))",
        toggle: {
          DEFAULT: "hsl(var(--sidebar-toggle))",
          foreground: "hsl(var(--sidebar-toggle-foreground))",
        },
      },
      "menu-trigger": {
        DEFAULT: "hsl(var(--menu-trigger))",
        hover: "hsl(var(--menu-trigger-hover))",
        foreground: "hsl(var(--menu-trigger-foreground))",
      },
      "name-field": {
        DEFAULT: "hsl(var(--name-field))",
        foreground: "hsl(var(--name-field-foreground))",
        caret: "hsl(var(--name-field-caret))",
      },
      "delete-button": {
        DEFAULT: "hsl(var(--delete-button))",
        foreground: "hsl(var(--delete-button-foreground))",
        hover: "hsl(var(--delete-button-hover))",
      },
      alert: {
        DEFAULT: "hsl(var(--alert))",
        foreground: "hsl(var(--alert-foreground))",
        heading: "hsl(var(--alert-heading))",
      },
      "primary-button": {
        DEFAULT: "hsl(var(--primary-button))",
        hover: "hsl(var(--primary-button-hover))",
        foreground: "hsl(var(--primary-button-foreground))",
      },
      "editor-header": {
        DEFAULT: "hsl(var(--editor-header))",
        foreground: "hsl(var(--editor-header-foreground))",
        "preview-hover": "hsl(var(--editor-header-preview-hover))",
      },
      content: {
        DEFAULT: "hsl(var(--content))",
        foreground: "hsl(var(--content-foreground))",
      },
      preview: {
        DEFAULT: "hsl(var(--preview))",
        foreground: "hsl(var(--preview-foreground))",
        h: "hsl(var(--preview-h))",
        h6: "hsl(var(--preview-h6))",
        blockquote: {
          DEFAULT: "hsl(var(--preview-blockquote))",
          foreground: "hsl(var(--preview-blockquote-foreground))",
          border: "hsl(var(--preview-blockquote-border))",
        },
        pre: {
          DEFAULT: "hsl(var(--preview-pre))",
          foreground: "hsl(var(--preview-pre-foreground))",
        },
        code: "hsl(var(--preview-code))",
        disc: "hsl(var(--preview-disc))",
      },
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-15.625rem)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-15.625rem)" },
        },
      },
      animation: {
        "slide-in": "slideIn 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-out": "slideOut 500ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
};
