import Image, { getImageProps, type ImageProps } from "next/image";
import Link from "next/link";
import { type ComponentProps, useId } from "react";
import { Icon } from "~/app/_components/icon";
import heroPhoneUrl from "~/app/_assets/desktop/image-hero-phone.png";
import desktopWebDesignUrl from "~/app/_assets/desktop/image-web-design-large.jpg";
import tabletWebDesignUrl from "~/app/_assets/tablet/image-web-design.jpg";
import mobileWebDesignUrl from "~/app/_assets/mobile/image-web-design.jpg";
import desktopAppDesignUrl from "~/app/_assets/desktop/image-app-design.jpg";
import tabletAppDesignUrl from "~/app/_assets/tablet/image-app-design.jpg";
import mobileAppDesignUrl from "~/app/_assets/mobile/image-app-design.jpg";
import desktopGraphicDesignUrl from "~/app/_assets/desktop/image-graphic-design.jpg";
import tabletGraphicDesignUrl from "~/app/_assets/tablet/image-graphic-design.jpg";
import mobileGraphicDesignUrl from "~/app/_assets/mobile/image-graphic-design.jpg";
import illustrationPassionate from "~/app/_assets/illustration-passionate.svg";
import illustrationResourceful from "~/app/_assets/illustration-resourceful.svg";
import illustrationFriendly from "~/app/_assets/illustration-friendly.svg";
import { media } from "~/app/_utils/screens";

function getMediaImageProps({
  alt,
  breakpoint,
}: {
  alt: ImageProps["alt"];
  breakpoint: {
    mobile: ImageProps["src"];
    tablet: ImageProps["src"];
    desktop: ImageProps["src"];
  };
}) {
  const { props: mobileImageProps } = getImageProps({
    alt,
    src: breakpoint.mobile,
  });
  const { props: tabletImageProps } = getImageProps({
    alt: "",
    src: breakpoint.tablet,
  });
  const { props: desktopImageProps } = getImageProps({
    alt: "",
    src: breakpoint.desktop,
  });

  return {
    mobileImageProps,
    tabletSourceProps: {
      media: media.tablet,
      width: tabletImageProps.width,
      height: tabletImageProps.height,
      srcSet: tabletImageProps.srcSet,
    },
    desktopSourceProps: {
      media: media.desktop,
      width: desktopImageProps.width,
      height: desktopImageProps.height,
      srcSet: desktopImageProps.srcSet,
    },
  };
}

const webDesignImageProps = getMediaImageProps({
  alt: "",
  breakpoint: {
    mobile: mobileWebDesignUrl,
    tablet: tabletWebDesignUrl,
    desktop: desktopWebDesignUrl,
  },
});
const appDesignImageProps = getMediaImageProps({
  alt: "",
  breakpoint: {
    mobile: mobileAppDesignUrl,
    tablet: tabletAppDesignUrl,
    desktop: desktopAppDesignUrl,
  },
});
const graphicDesignImageProps = getMediaImageProps({
  alt: "",
  breakpoint: {
    mobile: mobileGraphicDesignUrl,
    tablet: tabletGraphicDesignUrl,
    desktop: desktopGraphicDesignUrl,
  },
});

const hashLocations = {
  services: "services",
};

export default function HomePage() {
  return (
    <>
      <div className="center tablet:px-gutter px-0">
        <div className="isolate overflow-hidden bg-peach pt-20 text-white tablet:rounded-[0.9375rem] tablet:pt-16 desktop:pt-32">
          <div className="center-inner desktop:grid desktop:grid-cols-[minmax(auto,33.75rem)_minmax(auto,17.5rem)] desktop:justify-between">
            <div className="text-center desktop:text-start">
              <h1 className="text-h1">
                Award-winning custom designs and digital branding solutions
              </h1>
              <p className="mx-auto mt-5 max-w-[27.8125rem] desktop:mx-0">
                With over 10 years in the industry, we are experienced in
                creating fully responsive websites, app design, and engaging
                brand experiences. Find out more about our services.
              </p>
              <p className="mt-6 flex justify-center tablet:mt-5 desktop:mt-10 desktop:justify-start">
                <Link className="button" href={`#${hashLocations.services}`}>
                  Learn more
                </Link>
              </p>
            </div>
            <div className="relative mx-auto mt-20 aspect-[283/371] max-w-72 tablet:aspect-[283/388] desktop:m-0 desktop:aspect-[283/501]">
              <Image
                className="absolute -z-10 w-[224%] max-w-none -translate-x-[28%] -translate-y-[18%]"
                alt=""
                src={heroPhoneUrl}
              />
            </div>
          </div>
        </div>
      </div>
      <h2 className="sr-only" id={hashLocations.services}>
        Services
      </h2>
      <div className="center mt-32 grid gap-6 desktop:mt-40 desktop:grid-cols-2">
        <Service
          heading="Web design"
          href="/web-design"
          image={webDesignImageProps}
        />
        <Service
          heading="App design"
          href="/app-design"
          image={appDesignImageProps}
        />
        <Service
          heading="Graphic design"
          href="/graphic-design"
          image={graphicDesignImageProps}
        />
      </div>
      <h2 className="sr-only">Values</h2>
      <div className="center mt-32 grid gap-20 tablet:gap-8 desktop:mt-40 desktop:grid-cols-3">
        <Adjective
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          image={illustrationPassionate}
          heading="Passionate"
          body="Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions."
        />
        <Adjective
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          image={illustrationResourceful}
          heading="Resourceful"
          body="Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients’ needs."
        />
        <Adjective
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          image={illustrationFriendly}
          heading="Friendly"
          body="We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide."
        />
      </div>
      <div className="center">
        <div className="relative -mb-48 mt-32 rounded-[0.9375rem] bg-peach py-16 text-center text-white tablet:-mb-20 tablet:mt-16 tablet:py-14 desktop:-mb-20 desktop:mt-40 desktop:py-20 desktop:text-start">
          <div className="center-inner desktop:grid desktop:grid-cols-[minmax(auto,28.6875rem)_auto] desktop:items-center desktop:justify-between">
            <div>
              <h2 className="text-h2">Let’s talk about your project</h2>
              <p className="mt-3 tablet:mt-2">
                Ready to take it to the next level? Contact us today and find
                out how our expertise can help your business grow.
              </p>
            </div>
            <p className="mt-8 flex justify-center desktop:mt-0">
              <Link className="button" href="/contact">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

interface ServiceProps {
  heading: string;
  href: string;
  image: ReturnType<typeof getMediaImageProps>;
}

function Service({ heading, href, image }: ServiceProps) {
  const labelId = useId();

  return (
    <Link
      className="group relative isolate flex flex-col justify-center gap-3 rounded-[0.9375rem] bg-black py-24 text-center uppercase text-white tablet:gap-6 tablet:py-14 desktop:py-28 first:desktop:row-span-2"
      href={href}
      aria-labelledby={labelId}
    >
      <picture className="rounded-[inherit]">
        <source {...image.desktopSourceProps} />
        <source {...image.tabletSourceProps} />
        <img
          className="absolute inset-0 -z-10 size-full rounded-[inherit] object-cover"
          {...image.mobileImageProps}
        />
      </picture>
      <div className="absolute inset-0 -z-10 rounded-[inherit] bg-[hsl(0_0%_0%/0.5)] transition-colors group-hocus:bg-peach/80" />
      <h3 className="text-h2" id={labelId}>
        {heading}
      </h3>
      <p className="flex items-center justify-center gap-4 text-[0.9375rem] leading-[1.375rem] tracking-[0.3125rem] tablet:gap-5">
        View projects{" "}
        <span className="text-peach">
          <Icon
            className="h-[0.625rem] w-[0.4375rem]"
            name="icon-right-arrow"
          />
        </span>
      </p>
    </Link>
  );
}

interface AdjectiveProps {
  image: ComponentProps<typeof Image>["src"];
  heading: string;
  body: string;
}

function Adjective({ body, heading, image }: AdjectiveProps) {
  return (
    <div className="grid justify-items-center gap-12 text-center tablet:grid-cols-[auto_1fr] tablet:items-center tablet:text-start desktop:grid-cols-none desktop:items-start desktop:text-center">
      <Image alt="" src={image} />
      <div>
        <h3 className="text-h3 uppercase">{heading}</h3>
        <p className="mt-8 tablet:mt-4 desktop:mt-8">{body}</p>
      </div>
    </div>
  );
}
