import Image from "next/image";
import Link from "next/link";
import IconArrowRight from "~/app/_assets/icon-arrow-right.svg";
import imageHeroDesktop from "~/app/_assets/desktop/image-hero.jpg";
import imageHeroTablet from "~/app/_assets/tablet/image-header.jpg";
import imageHeroMobile from "~/app/_assets/mobile/image-header.jpg";
import imageCategoryThumbnailEarphones from "~/app/_assets/image-category-thumbnail-earphones.png";
import imageCategoryThumbnailHeadphones from "~/app/_assets/image-category-thumbnail-headphones.png";
import imageCategoryThumbnailSpeakers from "~/app/_assets/image-category-thumbnail-speakers.png";
import imageSpeakerZx9Desktop from "~/app/_assets/desktop/image-speaker-zx9.png";
import imageSpeakerZx9Tablet from "~/app/_assets/tablet/image-speaker-zx9.png";
import imageSpeakerZx9Mobile from "~/app/_assets/mobile/image-speaker-zx9.png";
import imageSpeakerZx7Desktop from "~/app/_assets/desktop/image-speaker-zx7.jpg";
import imageSpeakerZx7Tablet from "~/app/_assets/tablet/image-speaker-zx7.jpg";
import imageSpeakerZx7Mobile from "~/app/_assets/mobile/image-speaker-zx7.jpg";
import imageEarphonesYx1Desktop from "~/app/_assets/desktop/image-earphones-yx1.jpg";
import imageEarphonesYx1Tablet from "~/app/_assets/tablet/image-earphones-yx1.jpg";
import imageEarphonesYx1Mobile from "~/app/_assets/mobile/image-earphones-yx1.jpg";
import imageBestGearDesktop from "~/app/_assets/desktop/image-best-gear.jpg";
import imageBestGearTablet from "~/app/_assets/tablet/image-best-gear.jpg";
import imageBestGearMobile from "~/app/_assets/mobile/image-best-gear.jpg";
import { getMediaImageProps } from "~/app/_utils/image";

const imageHero = getMediaImageProps({
  alt: "todo",
  breakpoint: {
    desktop: imageHeroDesktop,
    tablet: imageHeroTablet,
    mobile: imageHeroMobile,
  },
});

const imageSpeakerZx9 = getMediaImageProps({
  alt: "todo",
  breakpoint: {
    desktop: imageSpeakerZx9Desktop,
    tablet: imageSpeakerZx9Tablet,
    mobile: imageSpeakerZx9Mobile,
  },
});

const imageSpeakerZx7 = getMediaImageProps({
  alt: "todo",
  breakpoint: {
    desktop: imageSpeakerZx7Desktop,
    tablet: imageSpeakerZx7Tablet,
    mobile: imageSpeakerZx7Mobile,
  },
});

const imageEarphonesYx1 = getMediaImageProps({
  alt: "todo",
  breakpoint: {
    desktop: imageEarphonesYx1Desktop,
    tablet: imageEarphonesYx1Tablet,
    mobile: imageEarphonesYx1Mobile,
  },
});

const imageBestGear = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: imageBestGearDesktop,
    tablet: imageBestGearTablet,
    mobile: imageBestGearMobile,
  },
});

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only text-h1">Audiophile home</h1>
      <div className="desktop:center isolate overflow-hidden bg-[hsl(0_0%_9%)] text-FFFFFF">
        <div className="desktop:layout grid desktop:py-[3.625rem]">
          <div className="order-last col-start-1 row-start-1 grid grid-rows-[108fr_auto_112fr] px-6 text-center tablet:grid-rows-[126fr_auto_167fr] desktop:col-span-9 desktop:col-start-auto desktop:row-start-auto desktop:grid-rows-[70fr_auto_100fr] desktop:px-0 desktop:text-start">
            <div className="row-start-2 mx-auto flex max-w-[24.75rem] flex-col desktop:mx-0">
              <h2 className="mt-4 text-h1 tablet:mt-6">
                XX99 Mark II Headphones
              </h2>
              <p className="order-first text-overline uppercase text-FFFFFF/50">
                New product
              </p>
              <p className="mx-auto mt-6 max-w-[21.8125rem] desktop:mx-0">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <p className="mt-7 tablet:mt-10">
                <Link
                  className="button-primary"
                  href="/product/xx99-mark-two-headphones"
                >
                  See product
                </Link>
              </p>
            </div>
          </div>
          <div className="col-start-1 row-start-1 desktop:relative desktop:-z-10 desktop:col-span-12 desktop:col-start-12 desktop:aspect-[570/516]">
            <picture>
              <source {...imageHero.desktopSourceProps} />
              <source {...imageHero.tabletSourceProps} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="w-full desktop:absolute desktop:-right-[29%] desktop:-top-[30%] desktop:w-[253%] desktop:max-w-none"
                {...imageHero.mobileImageProps}
              />
            </picture>
          </div>
        </div>
      </div>
      <h2 className="sr-only">Categories</h2>
      <div className="center mt-10 tablet:mt-24 desktop:mt-[7.5rem]">
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
      <div className="mt-32 bg-D87D4A text-FFFFFF/75 tablet:mt-24 desktop:mt-[10.5rem]">
        <div>
          <h2 className="text-h1 text-FFFFFF">ZX9 speaker</h2>
          <p>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <p>
            <Link
              className="bg-000000 text-sub-title uppercase text-FFFFFF transition-colors hocus:bg-[hsl(0_0%_30%)]"
              href="/product/zx9-speaker"
            >
              See product
            </Link>
          </p>
        </div>
        <picture>
          <source {...imageSpeakerZx9.desktopSourceProps} />
          <source {...imageSpeakerZx9.tabletSourceProps} />
          <img {...imageSpeakerZx9.mobileImageProps} />
        </picture>
      </div>
      <div className="bg-[hsl(0_0%_92%)] text-000000">
        <div>
          <h2 className="text-h4">ZX7 speaker</h2>
          <p>
            <Link className="button-ghost" href="/product/zx7-speaker">
              See product
            </Link>
          </p>
        </div>
        <picture>
          <source {...imageSpeakerZx7.desktopSourceProps} />
          <source {...imageSpeakerZx7.tabletSourceProps} />
          <img {...imageSpeakerZx7.mobileImageProps} />
        </picture>
      </div>
      <div className="grid tablet:grid-cols-2">
        <div className="order-last bg-F1F1F1 text-000000">
          <h2 className="text-h4">YX1 earphones</h2>
          <p>
            <Link className="button-ghost" href="/product/yx1-earphones">
              See product
            </Link>
          </p>
        </div>
        <picture>
          <source {...imageEarphonesYx1.desktopSourceProps} />
          <source {...imageEarphonesYx1.tabletSourceProps} />
          <img {...imageEarphonesYx1.mobileImageProps} />
        </picture>
      </div>
      <div className="grid desktop:grid-cols-2">
        <picture className="desktop:order-last">
          <source {...imageBestGear.desktopSourceProps} />
          <source {...imageBestGear.tabletSourceProps} />
          <img {...imageBestGear.mobileImageProps} />
        </picture>
        <div>
          <h2 className="text-h2 text-000000">
            Bringing you the <em className="not-italic text-D87D4A">best</em>{" "}
            audio gear
          </h2>
          <p>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </>
  );
}
