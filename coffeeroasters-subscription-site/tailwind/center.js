import plugin from "tailwindcss/plugin";

export const center = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "t-center": (width) => {
        return {
          boxSizing: "content-box",
          maxWidth: width,
          marginInline: "auto",
        };
      },
    },
    { values: theme("maxWidth") }
  );
});
