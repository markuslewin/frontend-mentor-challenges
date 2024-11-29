import Link from "next/link";
import imageHeroDesktop from "~/app/_assets/desktop/image-hero.jpg";
import imageHeroTablet from "~/app/_assets/tablet/image-header.jpg";
import imageHeroMobile from "~/app/_assets/mobile/image-header.jpg";
import imageSpeakerZx9Desktop from "~/app/_assets/desktop/image-speaker-zx9.png";
import imageSpeakerZx9Tablet from "~/app/_assets/tablet/image-speaker-zx9.png";
import imageSpeakerZx9Mobile from "~/app/_assets/mobile/image-speaker-zx9.png";
import imageSpeakerZx7Desktop from "~/app/_assets/desktop/image-speaker-zx7.jpg";
import imageSpeakerZx7Tablet from "~/app/_assets/tablet/image-speaker-zx7.jpg";
import imageSpeakerZx7Mobile from "~/app/_assets/mobile/image-speaker-zx7.jpg";
import imageEarphonesYx1Desktop from "~/app/_assets/desktop/image-earphones-yx1.jpg";
import imageEarphonesYx1Tablet from "~/app/_assets/tablet/image-earphones-yx1.jpg";
import imageEarphonesYx1Mobile from "~/app/_assets/mobile/image-earphones-yx1.jpg";
import PatternCircles from "~/app/_assets/pattern-circles.svg";
import { getMediaImageProps } from "~/app/_utils/image";
import { Categories } from "~/app/_components/categories";
import { BestGear } from "~/app/_components/best-gear";

const imageHero = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: imageHeroDesktop,
    tablet: imageHeroTablet,
    mobile: imageHeroMobile,
  },
});

const imageSpeakerZx9 = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: imageSpeakerZx9Desktop,
    tablet: imageSpeakerZx9Tablet,
    mobile: imageSpeakerZx9Mobile,
  },
});

const imageSpeakerZx7 = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: imageSpeakerZx7Desktop,
    tablet: imageSpeakerZx7Tablet,
    mobile: imageSpeakerZx7Mobile,
  },
});

const imageEarphonesYx1 = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: imageEarphonesYx1Desktop,
    tablet: imageEarphonesYx1Tablet,
    mobile: imageEarphonesYx1Mobile,
  },
});

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only text-h1">Audiophile home</h1>
      <div className="desktop:center isolate overflow-hidden bg-[hsl(0_0%_9%)] text-FFFFFF">
        <div className="desktop:layout grid desktop:pb-[3.625rem] desktop:pt-[9.6875rem]">
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
          <div className="-z-10 col-start-1 row-start-1 desktop:relative desktop:col-span-12 desktop:col-start-12 desktop:aspect-[570/516]">
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
      <Categories className="mt-10 tablet:mt-24 desktop:mt-[7.5rem]" />
      <div className="center">
        <div className="desktop:layout isolate mt-32 grid justify-items-center overflow-hidden rounded bg-D87D4A px-6 pb-14 pt-16 text-FFFFFF/75 tablet:mt-24 tablet:py-16 desktop:mt-[10.5rem] desktop:p-0">
          <div className="mx-auto mt-10 max-w-[21.8125rem] text-center tablet:mt-20 desktop:col-span-7 desktop:col-start-[15] desktop:row-start-1 desktop:mx-0 desktop:mt-0 desktop:grid desktop:grid-rows-[133fr_auto_124fr] desktop:text-start">
            <div className="row-start-2">
              <h2 className="text-h1 text-FFFFFF">ZX9 speaker</h2>
              <p className="mt-6">
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <p className="mt-6 tablet:mt-10">
                <Link className="button-secondary" href="/product/zx9-speaker">
                  See product
                </Link>
              </p>
            </div>
          </div>
          <div className="relative isolate -z-10 order-first desktop:order-none desktop:col-span-9 desktop:col-start-3 desktop:row-start-1 desktop:aspect-[445/560] desktop:w-full">
            <PatternCircles className="absolute left-1/2 top-1/2 -z-10 w-[349%] -translate-x-1/2 -translate-y-1/2 tablet:w-[536%] desktop:top-[77%] desktop:w-[212%]" />
            <picture>
              <source {...imageSpeakerZx9.desktopSourceProps} />
              <source {...imageSpeakerZx9.tabletSourceProps} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="max-w-40 tablet:max-w-44 desktop:absolute desktop:-bottom-[1%] desktop:left-[9%] desktop:w-[85%] desktop:max-w-full"
                {...imageSpeakerZx9.mobileImageProps}
              />
            </picture>
          </div>
        </div>
      </div>
      <div className="center mt-6 tablet:mt-8 desktop:mt-12">
        <div className="layout grid overflow-hidden rounded bg-[hsl(0_0%_92%)] text-000000 tablet:isolate">
          <div className="order-last col-start-1 row-start-1 grid items-center p-6 tablet:col-span-7 tablet:col-start-3 tablet:p-0">
            <div>
              <h2 className="text-h4">ZX7 speaker</h2>
              <p className="mt-8">
                <Link className="button-ghost" href="/product/zx7-speaker">
                  See product
                </Link>
              </p>
            </div>
          </div>
          <picture className="col-start-1 row-start-1 tablet:relative tablet:isolate tablet:-z-10 tablet:col-span-9 tablet:col-start-13 tablet:aspect-[280/320] tablet:w-full desktop:aspect-[445/320]">
            <source {...imageSpeakerZx7.desktopSourceProps} />
            <source {...imageSpeakerZx7.tabletSourceProps} />
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              className="w-full tablet:absolute tablet:-left-[125%] tablet:bottom-0 tablet:h-full tablet:w-auto tablet:max-w-none desktop:-left-[128%]"
              {...imageSpeakerZx7.mobileImageProps}
            />
          </picture>
        </div>
      </div>
      <div className="center mt-6 tablet:mt-8 desktop:mt-12">
        <div className="tablet:layout grid auto-rows-fr gap-6 tablet:gap-0">
          <div className="order-last grid items-center rounded bg-F1F1F1 p-6 text-000000 tablet:col-span-11 tablet:col-start-13 tablet:p-10 desktop:grid-cols-[65fr_30fr_65fr_30fr_65fr_30fr_65fr_30fr_65fr_30fr_65fr] desktop:p-0">
            <div className="desktop:col-span-9 desktop:col-start-3">
              <h2 className="text-h4">YX1 earphones</h2>
              <p className="mt-8">
                <Link className="button-ghost" href="/product/yx1-earphones">
                  See product
                </Link>
              </p>
            </div>
          </div>
          <picture className="tablet:col-span-11">
            <source {...imageEarphonesYx1.desktopSourceProps} />
            <source {...imageEarphonesYx1.tabletSourceProps} />
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              className="w-full rounded"
              {...imageEarphonesYx1.mobileImageProps}
            />
          </picture>
        </div>
      </div>
      <BestGear className="mt-32 tablet:mt-24 desktop:mt-[12.5rem]" />
    </>
  );
}
