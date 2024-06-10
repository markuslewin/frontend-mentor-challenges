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
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      header: {
        foreground: "hsl(var(--header-foreground))",
      },
      new: {
        DEFAULT: "hsl(var(--new))",
        foreground: {
          DEFAULT: "hsl(var(--new-foreground))",
          placeholder: "hsl(var(--new-foreground-placeholder))",
        },
        border: "hsl(var(--new-border))",
      },
      todo: {
        DEFAULT: "hsl(var(--todo))",
        foreground: {
          DEFAULT: "hsl(var(--todo-foreground))",
          fade: "hsl(var(--todo-foreground-fade))",
        },
        border: "hsl(var(--todo-border))",
      },
      filter: {
        foreground: {
          DEFAULT: "hsl(var(--filter-foreground))",
          active: "hsl(var(--filter-foreground-active))",
          hover: "hsl(var(--filter-foreground-hover))",
        },
      },
      checkbox: {
        foreground: "hsl(var(--checkbox-foreground))",
      },
      shadow: {
        DEFAULT: "hsl(var(--shadow))",
      },
    },
    backgroundImage: {
      header: "var(--header)",
      checkbox: "var(--checkbox)",
    },
    fontFamily: {
      base: "'Josefin Sans Variable', sans-serif",
    },
    fontSize: {
      heading: [
        "var(--fluid-27-40)",
        { fontWeight: 700, letterSpacing: "var(--fluid-10-15)" },
      ],
      "fs-todo": [
        "var(--fluid-12-18)",
        { letterSpacing: "var(--fluid--0.17--0.25)" },
      ],
      filter: [rem(14), { fontWeight: 700, letterSpacing: rem(-0.19) }],
      clear: [
        "var(--fluid-12-14)",
        { letterSpacing: "var(--fluid--0.17--0.19)" },
      ],
      body: [rem(14), { letterSpacing: rem(-0.19) }],
    },
    borderRadius: {
      DEFAULT: rem(5),
      full: "9999px",
    },
    boxShadow: {
      DEFAULT: `0 ${rem(35)} ${rem(50)} ${rem(-15)}`,
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
