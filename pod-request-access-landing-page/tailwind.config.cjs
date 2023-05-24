const rem = (px) => `${px / 16}rem`;
const scale = (px) => {
  const step = Math.round(px / 4);
  return { [step]: rem(step * 4) };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      "#54E6AF": "hsl(157 74% 62%)",
      "#2C344B": "hsl(225 26% 23%)",
      "#121725": "hsl(224 35% 11%)",
      "#FFFFFF": "hsl(0 0% 100%)",
      "#5A668A": "hsl(225 21% 45%)",
      "#C2CBE5": "hsl(225 40% 83%)",
      // not in figma
      "#B3FFE2": "hsl(157 100% 85%)",
    },
    boxShadow: {
      glow: `0 ${rem(25)} ${rem(20)} ${rem(-20)}`,
      "glow-desktop": `0 ${rem(2)} ${rem(4)} 0`,
    },
    fontFamily: {
      chivo: "'Chivo Variable', sans-serif",
    },
    fontSize: {
      title: [
        rem(26),
        {
          lineHeight: rem(38),
          fontWeight: "300",
        },
      ],
      "title-tablet": [
        rem(48),
        {
          lineHeight: rem(56),
          fontWeight: "300",
        },
      ],
      "title-desktop": [
        rem(52),
        {
          lineHeight: rem(62),
          fontWeight: "300",
        },
      ],
      body: [
        rem(15),
        {
          lineHeight: rem(25),
          fontWeight: "300",
        },
      ],
      "body-tablet": [
        rem(18),
        {
          lineHeight: rem(28),
          fontWeight: "300",
        },
      ],
      widget: [
        rem(14),
        {
          lineHeight: rem(28),
          fontWeight: "700",
        },
      ],
      feedback: [
        rem(12),
        {
          lineHeight: rem(14),
          fontWeight: "700",
        },
      ],
    },
    extend: {
      padding: {
        ...scale(50),
        ...scale(102),
      },
    },
  },
  plugins: [],
};
