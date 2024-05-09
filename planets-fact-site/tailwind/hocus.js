import plugin from "tailwindcss/plugin";

// Hover + focus = hocus
export const hocus = plugin(({ addVariant }) => {
  addVariant("hocus", ["&:hover", "&:focus-visible"]);
});
