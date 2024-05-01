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

export const images = [
  { ...one, thumbnail: oneThumbnail },
  { ...two, thumbnail: twoThumbnail },
  { ...three, thumbnail: threeThumbnail },
  { ...four, thumbnail: fourThumbnail },
] as {
  src: string;
  width: number;
  height: number;
  thumbnail: { src: string; width: number; height: number };
}[];
