// @ts-expect-error TS doesn't understand search params?
import tabletImg from "../assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=768&as=metadata";
// @ts-expect-error TS doesn't understand search params?
import mobileImg from "../assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=300&as=metadata";
import { screens } from "../utils/screens";

console.log({ mobile: mobileImg.src, tablet: tabletImg.src });

export function OptimizedImage() {
  return (
    <>
      <h1 className="text-heading-l">Optimized image</h1>
      <p className="mt-8">
        The original image was <strong>3.5 MB</strong>, but the following image
        is <strong>163 kB</strong>.
      </p>
      <picture>
        <source
          media={`(min-width: ${screens.tablet})`}
          width={tabletImg.width}
          height={tabletImg.height}
          srcSet={tabletImg.src}
        />
        <img
          className="mt-6 w-full"
          alt="The optimized image"
          width={mobileImg.width}
          height={mobileImg.height}
          src={mobileImg.src}
        />
      </picture>
    </>
  );
}
