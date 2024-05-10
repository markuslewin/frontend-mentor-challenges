import planets from "./data";

export type Planet = (typeof planets)[number];

export const colorByPlanet = {
  Mercury: "hsl(var(--color-419EBB))",
  Venus: "hsl(var(--color-EDA249))",
  Earth: "hsl(var(--color-6D2ED5))",
  Mars: "hsl(var(--color-D14C32))",
  Jupiter: "hsl(var(--color-D83A34))",
  Saturn: "hsl(var(--color-CD5120))",
  Uranus: "hsl(var(--color-1EC1A2))",
  Neptune: "hsl(var(--color-2D68F0))",
};

export { planets };
