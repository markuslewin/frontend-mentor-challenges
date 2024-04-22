// @ts-expect-error TS doesn't understand search params?
import islandImg from "../assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=768&as=metadata";

export function OptimizedImage() {
  return (
    <>
      <h1 className="text-heading-l">Optimized image</h1>
      <p className="mt-8">
        The original image was <strong>3.5 MB</strong>, but the following image
        is <strong>163 kB</strong>.
      </p>
      <img className="mt-6 w-full" alt="The image" src={islandImg.src} />
    </>
  );
}
