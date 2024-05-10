import data from "./data";
import { z } from "zod";

const images = import.meta.glob("./**/*.png", {
  query: "?as=metadata",
  eager: true,
});

const ImageSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
});

export type Image = z.infer<typeof ImageSchema>;

function getImage(path: string) {
  const image = images[path];
  return ImageSchema.parse(image);
}

const svgs = import.meta.glob("./**/*.svg", {
  eager: true,
});

const SvgSchema = z.object({
  default: z.string(),
});

function getSvg(path: string) {
  const svg = svgs[path];
  return SvgSchema.parse(svg).default;
}

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

export const widthByPlanet = {
  Mercury: 290,
  Venus: 400,
  Earth: 450,
  Mars: 336,
  Jupiter: 582,
  Saturn: 668,
  Uranus: 458,
  Neptune: 450,
};

const planets = data.map((planet) => {
  return {
    ...planet,
    images: {
      planet: {
        src: getSvg(planet.images.planet),
        width: widthByPlanet[planet.name],
        height: widthByPlanet[planet.name],
      },
      internal: {
        src: getSvg(planet.images.internal),
        width: widthByPlanet[planet.name],
        height: widthByPlanet[planet.name],
      },
      geology: getImage(planet.images.geology),
    },
  };
});

export { planets };

export type Planet = (typeof planets)[number];
