const { screens } = require("./src/utils/screens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens,
    extend: {},
  },
  plugins: [],
};
