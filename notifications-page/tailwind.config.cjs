/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    extend: {},
  },
  plugins: [],
};
