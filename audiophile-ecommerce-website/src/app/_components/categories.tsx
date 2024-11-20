import Link from "next/link";
import Image from "next/image";
import IconArrowRight from "~/app/_assets/icon-arrow-right.svg";
import imageCategoryThumbnailEarphones from "~/app/_assets/image-category-thumbnail-earphones.png";
import imageCategoryThumbnailHeadphones from "~/app/_assets/image-category-thumbnail-headphones.png";
import imageCategoryThumbnailSpeakers from "~/app/_assets/image-category-thumbnail-speakers.png";

interface CategoriesProps {
  className?: string;
}

export function Categories({ className = "" }: CategoriesProps) {
  return (
    <>
      <h2 className="sr-only">Categories</h2>
      <div className={`${className} center`}>
        <div className="layout grid gap-4 tablet:gap-0">
          {[
            {
              className: "",
              image: imageCategoryThumbnailHeadphones,
              name: "Headphones",
              href: "/headphones",
            },
            {
              className: "tablet:col-start-9",
              image: imageCategoryThumbnailSpeakers,
              name: "Speakers",
              href: "/speakers",
            },
            {
              className: "tablet:col-start-[17]",
              image: imageCategoryThumbnailEarphones,
              name: "Earphones",
              href: "/earphones",
            },
          ].map((category, i) => {
            return (
              <Link
                className={`${category.className} group relative isolate rounded text-center tablet:col-span-7`}
                key={i}
                href={category.href}
              >
                <div className="aspect-[350/80] w-full" />
                <div className="rounded-inherit bg-F1F1F1 pb-6">
                  <div className="aspect-[350/130] w-full" />
                  <div className="absolute inset-x-0 top-0 mx-auto grid aspect-[218/210] w-[62%] items-end">
                    <Image
                      className="w-full"
                      alt=""
                      placeholder="blur"
                      src={category.image}
                    />
                  </div>
                  <div className="relative grid justify-items-center">
                    <h3 className="-mt-4 text-h6 text-000000">
                      {category.name}
                    </h3>
                    <p className="mt-4">
                      <span
                        className="flex items-center gap-3 text-sub-title uppercase transition-colors group-hocus:text-D87D4A"
                        aria-hidden="true"
                      >
                        Shop{" "}
                        <span className="text-D87D4A">
                          <IconArrowRight className="h-3 w-2" />
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
