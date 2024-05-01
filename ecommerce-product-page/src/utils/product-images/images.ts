// @ts-expect-error Search params
import one from "./image-product-1.jpg?as=metadata";
// @ts-expect-error Search params
import oneThumbnail from "./image-product-1-thumbnail.jpg?as=metadata";
// @ts-expect-error Search params
import two from "./image-product-2.jpg?as=metadata";
// @ts-expect-error Search params
import twoThumbnail from "./image-product-2-thumbnail.jpg?as=metadata";
// @ts-expect-error Search params
import three from "./image-product-3.jpg?as=metadata";
// @ts-expect-error Search params
import threeThumbnail from "./image-product-3-thumbnail.jpg?as=metadata";
// @ts-expect-error Search params
import four from "./image-product-4.jpg?as=metadata";
// @ts-expect-error Search params
import fourThumbnail from "./image-product-4-thumbnail.jpg?as=metadata";
import { useState } from "react";
import { clamp } from "../math";

export const images = [
  { ...one, description: "<Description of image 1>", thumbnail: oneThumbnail },
  { ...two, description: "<Description of image 2>", thumbnail: twoThumbnail },
  {
    ...three,
    description: "<Description of image 3>",
    thumbnail: threeThumbnail,
  },
  {
    ...four,
    description: "<Description of image 4>",
    thumbnail: fourThumbnail,
  },
] as {
  src: string;
  description: string;
  width: number;
  height: number;
  thumbnail: { src: string; width: number; height: number };
}[];

export function useCurrentImage<T>(images: T[]) {
  const [index, _setIndex] = useState(0);

  return {
    index,
    current: images[index],
    setIndex(index: number) {
      _setIndex(clamp({ value: index, min: 0, max: images.length }));
    },
    next() {
      _setIndex((index + 1) % images.length);
    },
    previous() {
      const nextIndex = index - 1;
      _setIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
    },
  };
}
