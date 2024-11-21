import Link from "next/link";
import { BestGear } from "~/app/_components/best-gear";
import { Categories } from "~/app/_components/categories";
import products from "~/app/_data/data.json";
import { media } from "~/app/_utils/screens";

export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    throw new Error(`Invalid product: ${slug}`);
  }

  return (
    <>
      <div className="center mt-4 tablet:mt-8 desktop:mt-20">
        <div>
          <Link href={`/${product.category}`}>Go Back</Link>
        </div>
      </div>
      <div className="center mt-6 desktop:mt-14">
        <div className="layout grid tablet:items-center">
          <div className="mt-8 grid tablet:col-span-11 tablet:col-start-13 tablet:mt-0 desktop:col-[15/span_9]">
            <h1 className="mt-6 text-h2 text-000000 tablet:mt-4">
              {product.name}
            </h1>
            {product.new ? (
              <p className="order-first text-overline uppercase text-D87D4A">
                New product
              </p>
            ) : null}
            <p className="mt-6 tablet:mt-8">{product.description}</p>
            <p className="mt-6 tablet:mt-8">
              <span className="sr-only">Price: </span>
              <strong className="text-h6 text-000000">{product.price}</strong>
            </p>
            <form className="mt-8 desktop:mt-12">
              <fieldset className="bg-F1F1F1 text-000000/25">
                <legend className="sr-only">Select quantity</legend>
                <input type="hidden" />
                <p className="text-000000">
                  <span>Quantity: </span> 1
                </p>
                <button type="button">
                  <span aria-hidden="true">-</span>
                  <span className="sr-only">Decrement quantity</span>
                </button>
                <button type="button">
                  <span aria-hidden="true">+</span>
                  <span className="sr-only">Increment quantity</span>
                </button>
              </fieldset>
              <button className="button-primary" type="submit">
                Add to cart
              </button>
            </form>
          </div>
          <picture className="order-first tablet:col-span-9 tablet:col-start-1 tablet:row-start-1 desktop:col-span-11">
            <source
              media={media.desktop}
              width={1080}
              height={1120}
              srcSet={getAssetUrl(product.image.desktop)}
            />
            <source
              media={media.tablet}
              width={562}
              height={960}
              srcSet={getAssetUrl(product.image.tablet)}
            />
            <img
              className="w-full rounded"
              alt="todo"
              width={654}
              height={654}
              srcSet={getAssetUrl(product.image.mobile)}
            />
          </picture>
        </div>
      </div>
      <div className="center mt-20 tablet:mt-32 desktop:mt-40">
        <div className="layout">
          <div className="tablet:col-span-full desktop:col-[1/span_13]">
            <h2 className="text-h3 text-000000">Features</h2>
            <div className="mt-6 space-y-[1.5625rem] tablet:mt-8">
              {product.features.split("\n\n").map((feature, i) => {
                return <p key={i}>{feature}</p>;
              })}
            </div>
          </div>
          <div className="mt-20 tablet:col-span-full tablet:mt-32 tablet:grid tablet:grid-cols-[inherit] desktop:col-[17/span_7] desktop:mt-0 desktop:block">
            <h2 className="text-h3 text-000000 tablet:col-span-9">
              In the box
            </h2>
            <ul
              className="mt-6 grid gap-2 tablet:col-[13/span_11] tablet:mt-0 desktop:mt-8"
              role="list"
            >
              {product.includes.map((include, i) => {
                return (
                  <li className="grid grid-cols-[2.5rem_1fr]" key={i}>
                    <span className="font-bold text-D87D4A">
                      {include.quantity}x
                    </span>{" "}
                    {include.item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="center mt-20 tablet:mt-32 desktop:mt-40">
        <div className="layout grid grid-rows-[auto_1fr_auto] gap-5 tablet:gap-0">
          <h2 className="sr-only">Gallery</h2>
          <picture className="tablet:col-span-9">
            <source
              media={media.desktop}
              width={445}
              height={280}
              srcSet={getAssetUrl(product.gallery.first.desktop)}
            />
            <source
              media={media.tablet}
              width={554}
              height={348}
              srcSet={getAssetUrl(product.gallery.first.tablet)}
            />
            <img
              className="w-full rounded"
              alt="todo"
              width={654}
              height={348}
              src={getAssetUrl(product.gallery.first.mobile)}
            />
          </picture>
          <picture className="tablet:col-span-9 tablet:row-start-3">
            <source
              media={media.desktop}
              width={445}
              height={280}
              srcSet={getAssetUrl(product.gallery.second.desktop)}
            />
            <source
              media={media.tablet}
              width={554}
              height={348}
              srcSet={getAssetUrl(product.gallery.second.tablet)}
            />
            <img
              className="w-full rounded"
              alt="todo"
              width={654}
              height={348}
              src={getAssetUrl(product.gallery.second.mobile)}
            />
          </picture>
          <picture className="tablet:col-[11/span_13] tablet:row-span-3">
            <source
              media={media.desktop}
              width={635}
              height={592}
              srcSet={getAssetUrl(product.gallery.third.desktop)}
            />
            <source
              media={media.tablet}
              width={790}
              height={736}
              srcSet={getAssetUrl(product.gallery.third.tablet)}
            />
            <img
              className="w-full rounded"
              alt="todo"
              width={654}
              height={736}
              src={getAssetUrl(product.gallery.third.mobile)}
            />
          </picture>
        </div>
      </div>
      <div className="center mt-32 desktop:mt-40">
        <div>
          <h2 className="text-center text-h3 text-000000">You may also like</h2>
          <div className="layout mt-10 grid gap-14 tablet:mt-14 tablet:gap-0 desktop:mt-16">
            {product.others.map((other, i) => {
              return (
                <div
                  className={[
                    "grid text-center tablet:col-span-7",
                    i % 3 === 0 ? "" : "",
                    i % 3 === 1 ? "tablet:col-start-9" : "",
                    i % 3 === 2 ? "tablet:col-start-[17]" : "",
                  ].join(" ")}
                  key={i}
                >
                  <h3 className="mt-8 text-h5 text-000000 tablet:mt-10">
                    {other.name}
                  </h3>
                  <picture className="order-first">
                    <source
                      media={media.desktop}
                      width={700}
                      height={636}
                      srcSet={getAssetUrl(other.image.desktop)}
                    />
                    <source
                      media={media.tablet}
                      width={446}
                      height={636}
                      srcSet={getAssetUrl(other.image.tablet)}
                    />
                    <img
                      className="w-full rounded"
                      alt="todo"
                      width={654}
                      height={240}
                      src={getAssetUrl(other.image.mobile)}
                    />
                  </picture>
                  <p className="mt-8">
                    <Link
                      className="button-primary"
                      href={`/product/${other.slug}`}
                    >
                      See product
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Categories className="mt-32 desktop:mt-40" />
      <BestGear className="mt-32 desktop:mt-40" />
    </>
  );
}

function getAssetUrl(url: string) {
  return url.replace(/^\.\//, "/");
}
