import Link from "next/link";
import Image from "next/image";
import IconArrowRight from "~/app/_assets/icon-arrow-right.svg";
import imageCategoryThumbnailEarphones from "~/app/_assets/image-category-thumbnail-earphones.png";
import imageCategoryThumbnailHeadphones from "~/app/_assets/image-category-thumbnail-headphones.png";
import imageCategoryThumbnailSpeakers from "~/app/_assets/image-category-thumbnail-speakers.png";

// todo: Refactor into heading components
type HeadingLevel = 1 | 2 | 3 | 4 | 5;
type Heading = `h${HeadingLevel}`;

interface CategoriesProps {
  className?: string;
  headingLevel?: HeadingLevel;
  onSelect?: () => void;
}

export function Categories({
  className = "",
  headingLevel = 2,
  onSelect,
}: CategoriesProps) {
  const CategoriesHeading = `h${headingLevel}` satisfies Heading;
  const CategoryHeading = `h${headingLevel + 1}` as Heading;
  return (
    <>
      <CategoriesHeading className="sr-only">Categories</CategoriesHeading>
      <div className={`${className} center`}>
        <div className="layout grid gap-4 tablet:gap-0">
          {[
            {
              className: "",
              imageClassName:
                "w-[8.875rem] desktop:w-[13.625rem] top-0 tablet:top-[0.0625rem]",

              image: imageCategoryThumbnailHeadphones,
              name: "Headphones",
              href: "/headphones",
            },
            {
              className: "tablet:col-start-9",
              imageClassName:
                "w-[9.375rem] desktop:w-[13.5rem] top-0 desktop:top-[0.4375rem]",
              image: imageCategoryThumbnailSpeakers,
              name: "Speakers",
              href: "/speakers",
            },
            {
              className: "tablet:col-start-[17]",
              imageClassName:
                "w-[11.25rem] desktop:w-[13.5rem] top-0 desktop:top-[1.375rem]",
              image: imageCategoryThumbnailEarphones,
              name: "Earphones",
              href: "/earphones",
            },
          ].map((category, i) => {
            return (
              <Link
                className={`${category.className} group relative isolate rounded pt-[3.25rem] text-center tablet:col-span-7 desktop:pt-20`}
                key={i}
                href={category.href}
                onClick={onSelect}
              >
                <div className="rounded-inherit bg-F1F1F1 pb-6 pt-[5.5rem] desktop:pt-[7.25rem]">
                  <Image
                    className={`${category.imageClassName} absolute inset-x-0 mx-auto`}
                    alt=""
                    src={category.image}
                  />
                  <div className="relative grid text-center">
                    <CategoryHeading className="text-h6 text-000000">
                      {category.name}
                    </CategoryHeading>
                    <p className="mt-4 text-sub-title uppercase">
                      <span
                        className="inline-flex items-center gap-3 transition-colors group-hocus:text-D87D4A"
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
