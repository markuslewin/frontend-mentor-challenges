// @ts-expect-error Search params
import heroWhitecupMobile from "../assets/about/mobile/image-hero-whitecup.jpg?as=metadata";
// @ts-expect-error Search params
import heroWhitecupTablet from "../assets/about/tablet/image-hero-whitecup.jpg?as=metadata";
// @ts-expect-error Search params
import heroWhitecupDesktop from "../assets/about/desktop/image-hero-whitecup.jpg?as=metadata";
// @ts-expect-error Search params
import commitmentMobile from "../assets/about/mobile/image-commitment.jpg?as=metadata";
// @ts-expect-error Search params
import commitmentTablet from "../assets/about/tablet/image-commitment.jpg?as=metadata";
// @ts-expect-error Search params
import commitmentDesktop from "../assets/about/desktop/image-commitment.jpg?as=metadata";
// @ts-expect-error Search params
import bgQualityMobile from "../assets/about/mobile/bg-quality.png?as=metadata";
// @ts-expect-error Search params
import bgQualityTablet from "../assets/about/tablet/bg-quality.png?as=metadata";
// @ts-expect-error Search params
import bgQualityDesktop from "../assets/about/desktop/bg-quality.png?as=metadata";
// @ts-expect-error Search params
import qualityMobile from "../assets/about/mobile/image-quality.jpg?as=metadata";
// @ts-expect-error Search params
import qualityTablet from "../assets/about/tablet/image-quality.jpg?as=metadata";
// @ts-expect-error Search params
import qualityDesktop from "../assets/about/desktop/image-quality.jpg?as=metadata";
import { AnnouncementHandle } from "../components/route-announcer";
import { screens } from "../utils/screens";
import { Icon } from "../components/icon";
import { ReactNode } from "react";
import { cx } from "class-variance-authority";

export const handle = {
  announcement() {
    return "About";
  },
} satisfies AnnouncementHandle;

export function AboutRoute() {
  return (
    <div className="pb-32 tablet:pb-36 desktop:pb-[10.5rem]">
      <div className="t-center-outer px-gutter">
        <div className="text-light-cream relative">
          <picture>
            <source
              media={`(min-width: ${screens.desktop})`}
              width={heroWhitecupDesktop.width}
              height={heroWhitecupDesktop.height}
              srcSet={heroWhitecupDesktop.src}
            />
            <source
              media={`(min-width: ${screens.tablet})`}
              width={heroWhitecupTablet.width}
              height={heroWhitecupTablet.height}
              srcSet={heroWhitecupTablet.src}
            />
            <img
              className="absolute inset-0 size-full object-cover -z-10 rounded"
              alt=""
              width={heroWhitecupMobile.width}
              height={heroWhitecupMobile.height}
              src={heroWhitecupMobile.src}
            />
          </picture>
          <div className="layout-grid t-center-inner px-gutter tablet:px-0 desktop:px-gutter">
            <div className="col-[3_/_span_13] pt-28 pb-20 text-center tablet:py-32 tablet:text-start desktop:col-start-1 desktop:col-span-9 desktop:py-[8.5625rem]">
              <h1 className="font-fraunces text-h2 capitalize">About us</h1>
              <p className="mt-6">
                Coffeeroasters began its journey of exotic discovery in 1999,
                highlighting stories of coffee from around the world. We have
                since been dedicated to bring the perfect cup - from bean to
                brew - in every shipment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-grid t-center-inner px-gutter mt-32 tablet:mt-36 desktop:mt-[10.5rem]">
        <picture className="col-span-9">
          <source
            media={`(min-width: ${screens.desktop})`}
            width={commitmentDesktop.width}
            height={commitmentDesktop.height}
            srcSet={commitmentDesktop.src}
          />
          <source
            media={`(min-width: ${screens.tablet})`}
            width={commitmentTablet.width}
            height={commitmentTablet.height}
            srcSet={commitmentTablet.src}
          />
          <img
            className="size-full object-cover rounded-sm"
            alt=""
            width={commitmentMobile.width}
            height={commitmentMobile.height}
            src={commitmentMobile.src}
          />
        </picture>
        <div className="col-start-13 col-end-[-1] self-center text-center mt-12 tablet:text-start tablet:mt-0">
          <h2 className="font-fraunces font-black text-[2rem] leading-[3rem] desktop:text-[2.5rem]">
            Our commitment
          </h2>
          <p className="mt-8">
            We’re built on a simple mission and a commitment to doing good along
            the way. We want to make it easy for you to discover and brew the
            world’s best coffee at home. It all starts at the source. To locate
            the specific lots we want to purchase, we travel nearly 60 days a
            year trying to understand the challenges and opportunities in each
            of these places. We collaborate with exceptional coffee growers and
            empower a global community of farmers through with well above
            fair-trade benchmarks. We also offer training, support farm
            community initiatives, and invest in coffee plant science. Curating
            only the finest blends, we roast each lot to highlight tasting
            profiles distinctive to their native growing region.
          </p>
        </div>
      </div>
      <div className="mt-32 tablet:mt-36 desktop:mt-[10.5rem]">
        <picture>
          <source
            media={`(min-width: ${screens.desktop})`}
            width={bgQualityDesktop.width}
            height={bgQualityDesktop.height}
            srcSet={bgQualityDesktop.src}
          />
          <source
            media={`(min-width: ${screens.tablet})`}
            width={bgQualityTablet.width}
            height={bgQualityTablet.height}
            srcSet={bgQualityTablet.src}
          />
          <img
            alt=""
            width={bgQualityMobile.width}
            height={bgQualityMobile.height}
            src={bgQualityMobile.src}
          />
        </picture>
        <h2>Uncompromising quality</h2>
        <p>
          Although we work with growers who pay close attention to all stages of
          harvest and processing, we employ, on our end, a rigorous quality
          control program to avoid over-roasting or baking the coffee dry. Every
          bag of coffee is tagged with a roast date and batch number. Our goal
          is to roast consistent, user-friendly coffee, so that brewing is easy
          and enjoyable.
        </p>
      </div>
      <picture>
        <source
          media={`(min-width: ${screens.desktop})`}
          width={qualityDesktop.width}
          height={qualityDesktop.height}
          srcSet={qualityDesktop.src}
        />
        <source
          media={`(min-width: ${screens.tablet})`}
          width={qualityTablet.width}
          height={qualityTablet.height}
          srcSet={qualityTablet.src}
        />
        <img
          alt=""
          width={qualityMobile.width}
          height={qualityMobile.height}
          src={qualityMobile.src}
        />
      </picture>
      <div className="t-center-inner px-gutter text-center mt-32 tablet:text-start tablet:mt-36 desktop:mt-[10.5rem]">
        <h2 className="text-grey font-fraunces text-h4">Our headquarters</h2>
        <div className="layout-grid mt-[4.5rem]">
          <Headquarter>
            <HeadquarterIcon>
              <Icon
                className="w-[2.625rem] h-auto mx-auto tablet:mx-0"
                name="illustration-uk"
                width="42"
                height="50"
              />
            </HeadquarterIcon>
            <HeadquarterHeading>United Kingdom</HeadquarterHeading>
            <h4 className="sr-only">Address</h4>
            <HeadquarterAddress>
              68 Asfordby Rd
              <br />
              Alcaston
              <br />
              SY6 1YA
            </HeadquarterAddress>
            <h4 className="sr-only">Phone</h4>
            <p>
              <a href="tel:+441241918425">+44 1241 918425</a>
            </p>
          </Headquarter>
          <Headquarter className="col-start-9 desktop:col-start-9 mt-20 tablet:mt-0">
            <HeadquarterIcon>
              <Icon
                className="w-[3.25rem] h-auto mx-auto tablet:mx-0"
                name="illustration-canada"
                width="52"
                height="50"
              />
            </HeadquarterIcon>
            <HeadquarterHeading>Canada</HeadquarterHeading>
            <h4 className="sr-only">Address</h4>
            <HeadquarterAddress>
              1528 Eglinton Avenue
              <br />
              Toronto
              <br />
              Ontario M4P 1A6
            </HeadquarterAddress>
            <h4 className="sr-only">Phone</h4>
            <p>
              <a href="tel:+14164852997">+1 416 485 2997</a>
            </p>
          </Headquarter>
          <Headquarter className="col-start-[17] desktop:col-start-[17] mt-20 tablet:mt-0">
            <HeadquarterIcon>
              <Icon
                className="w-[3.0625rem] h-auto mx-auto tablet:mx-0"
                name="illustration-australia"
                width="49"
                height="44"
              />
            </HeadquarterIcon>
            <HeadquarterHeading>Australia</HeadquarterHeading>
            <h4 className="sr-only">Address</h4>
            <HeadquarterAddress>
              36 Swanston Street
              <br />
              Kewell
              <br />
              Victoria
            </HeadquarterAddress>
            <h4 className="sr-only">Phone</h4>
            <p>
              <a href="tel:+61499283629">+61 4 9928 3629</a>
            </p>
          </Headquarter>
        </div>
      </div>
    </div>
  );
}

function Headquarter({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("col-span-7 desktop:col-span-6", className)}>
      {children}
    </div>
  );
}

function HeadquarterIcon({ children }: { children: ReactNode }) {
  return (
    <div className="text-dark-cyan h-[3.125rem] inline-grid place-items-center">
      {children}
    </div>
  );
}

function HeadquarterHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-fraunces font-black text-[1.75rem] leading-[2.25rem] mt-[2.8125rem] tablet:text-[1.5rem] desktop:text-[2rem]">
      {children}
    </h3>
  );
}

function HeadquarterAddress({ children }: { children: ReactNode }) {
  return <p className="mt-6">{children}</p>;
}
