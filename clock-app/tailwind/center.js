import plugin from "tailwindcss/plugin";

// Centers content horizontally
export const center = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      center: (maxWidth) => {
        return {
          display: "grid",
          gridTemplateColumns: `minmax(var(--center-gutter, 0), 1fr) minmax(auto, ${maxWidth}) minmax(var(--center-gutter, 0), 1fr)`,
          "& > *": {
            gridColumnStart: "2",
          },
        };
      },
    },
    { values: theme("maxWidth") },
  );
  matchUtilities(
    {
      "center-gutter": (padding) => {
        return {
          "--center-gutter": padding,
        };
      },
    },
    { values: theme("padding") },
  );
});
