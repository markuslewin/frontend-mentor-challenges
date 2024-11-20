import Link from "next/link";
import { BestGear } from "~/app/_components/best-gear";
import { Categories } from "~/app/_components/categories";
import products from "~/app/_data/data.json";
import { media } from "~/app/_utils/screens";

const headphones = products
  .filter((p) => p.category === "headphones")
  .reverse();

export default async function HeadphonesPage() {
  return (
    <>
      <div className="center bg-000000 py-8 text-FFFFFF tablet:py-24">
        <div>
          <h1 className="text-center text-h2">Headphones</h1>
        </div>
      </div>
      <div className="center mt-16 tablet:mt-32 desktop:mt-40">
        <div className="grid gap-32 desktop:gap-40">
          {headphones.map((headphone, i) => {
            const isEven = i % 2 === 0;

            return (
              <div className="layout grid items-center" key={headphone.id}>
                <div
                  className={[
                    "order-last mx-auto mt-8 grid max-w-[35.75rem] text-center tablet:col-span-full tablet:mt-14 desktop:mx-0 desktop:mt-0 desktop:text-start",
                    isEven ? "desktop:col-[15/span_9]" : "desktop:col-span-9",
                  ].join(" ")}
                >
                  <h2 className="mx-auto mt-6 max-w-96 text-h2 text-000000 tablet:mt-4 desktop:mx-0">
                    {headphone.name}
                  </h2>
                  {headphone.new ? (
                    <p className="order-first text-overline uppercase text-D87D4A">
                      New product
                    </p>
                  ) : null}
                  <p className="mt-6 tablet:mt-8">{headphone.description}</p>
                  <p className="mt-6 desktop:mt-10">
                    <Link
                      className="button-primary"
                      href={`/product/${headphone.slug}`}
                    >
                      See product
                    </Link>
                  </p>
                </div>
                <picture
                  className={[
                    "tablet:col-span-full desktop:row-start-1",
                    isEven ? "desktop:col-span-11" : "desktop:col-[13/span_11]",
                  ].join(" ")}
                >
                  <source
                    media={media.desktop}
                    width={1080}
                    height={1120}
                    srcSet={headphone.categoryImage.desktop}
                  />
                  <source
                    media={media.tablet}
                    width={1378}
                    height={704}
                    srcSet={headphone.categoryImage.tablet}
                  />
                  <img
                    className="w-full rounded"
                    alt="todo"
                    width={654}
                    height={704}
                    src={headphone.categoryImage.mobile}
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>
      <Categories className="mt-32 desktop:mt-40" />
      <BestGear className="mt-32 desktop:mt-40" />
    </>
  );
}
