import imageBestGearDesktop from "~/app/_assets/desktop/image-best-gear.jpg";
import imageBestGearTablet from "~/app/_assets/tablet/image-best-gear.jpg";
import imageBestGearMobile from "~/app/_assets/mobile/image-best-gear.jpg";
import { getMediaImageProps } from "~/app/_utils/image";

const imageBestGear = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: imageBestGearDesktop,
    tablet: imageBestGearTablet,
    mobile: imageBestGearMobile,
  },
});

interface BestGearProps {
  className?: string;
}

export function BestGear({ className = "" }: BestGearProps) {
  return (
    <div className={`${className} center`}>
      <div className="desktop:layout desktop:items-center">
        <picture className="desktop:order-last desktop:col-span-11 desktop:col-start-13">
          <source {...imageBestGear.desktopSourceProps} />
          <source {...imageBestGear.tabletSourceProps} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img className="w-full rounded" {...imageBestGear.mobileImageProps} />
        </picture>
        <div className="mx-auto mt-10 max-w-[35.8125rem] text-center tablet:mt-16 desktop:col-span-9 desktop:mx-0 desktop:mt-0 desktop:text-start">
          <h2 className="text-h2 text-000000">
            Bringing you the <em className="not-italic text-D87D4A">best</em>{" "}
            audio gear
          </h2>
          <p className="mt-8">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </div>
  );
}
