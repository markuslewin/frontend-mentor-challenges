/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        tablet: "40em",
        desktop: "64em",
      },
      spacing: {
        21: "5.25rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
