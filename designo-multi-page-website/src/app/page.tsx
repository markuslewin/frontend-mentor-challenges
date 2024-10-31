import Image, { getImageProps, type ImageProps } from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
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
        <div className="overflow-hidden bg-peach px-6 pt-20 text-white tablet:rounded-[0.9375rem] tablet:pt-16 desktop:pt-32">
          <div className="mx-auto box-content max-w-[57.5rem] desktop:grid desktop:grid-cols-[minmax(auto,33.75rem)_minmax(auto,17.5rem)] desktop:justify-between">
            <div className="mx-auto max-w-[35.8125rem] text-center desktop:mx-0 desktop:text-start">
              <h1 className="text-h1">
                Award-winning custom designs and digital branding solutions
              </h1>
              <p className="mx-auto mt-5 max-w-[27.8125rem] desktop:mx-0">
                With over 10 years in the industry, we are experienced in
                creating fully responsive websites, app design, and engaging
                brand experiences. Find out more about our services.
              </p>
              <p className="mt-6 flex justify-center tablet:mt-5 desktop:mt-10 desktop:justify-start">
                <Link
                  className="rounded-[0.5rem] bg-white px-6 py-4 font-medium uppercase tracking-[0.0625rem] text-dark-grey transition-colors hocus:bg-light-peach hocus:text-white"
                  href={`#${hashLocations.services}`}
                >
                  Learn more
                </Link>
              </p>
            </div>
            <div className="relative mx-auto mt-20 aspect-[283/371] max-w-72 tablet:aspect-[283/388] desktop:m-0 desktop:aspect-[283/501]">
              <Image
                className="absolute w-[224%] max-w-none -translate-x-[28%] -translate-y-[18%]"
                alt=""
                src={heroPhoneUrl}
              />
            </div>
          </div>
        </div>
      </div>
      <h2 id={hashLocations.services}>Services</h2>
      <Service>
        <picture>
          <source {...webDesignImageProps.desktopSourceProps} />
          <source {...webDesignImageProps.tabletSourceProps} />
          <img {...webDesignImageProps.mobileImageProps} />
        </picture>
        <h3>Web design</h3>
        <p>
          <ServiceLink href="/web-design">
            View projects <Icon name="icon-right-arrow" />
          </ServiceLink>
        </p>
      </Service>
      <Service>
        <picture>
          <source {...appDesignImageProps.desktopSourceProps} />
          <source {...appDesignImageProps.tabletSourceProps} />
          <img {...appDesignImageProps.mobileImageProps} />
        </picture>
        <h3>App design</h3>
        <p>
          <ServiceLink href="/app-design">
            View projects <Icon name="icon-right-arrow" />
          </ServiceLink>
        </p>
      </Service>
      <Service>
        <picture>
          <source {...graphicDesignImageProps.desktopSourceProps} />
          <source {...graphicDesignImageProps.tabletSourceProps} />
          <img {...graphicDesignImageProps.mobileImageProps} />
        </picture>
        <h3>Graphic design</h3>
        <p>
          <ServiceLink href="/graphic-design">
            View projects <Icon name="icon-right-arrow" />
          </ServiceLink>
        </p>
      </Service>
      <h2>Values</h2>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image alt="" src={illustrationPassionate} />
        <h3>Passionate</h3>
        <p>
          Each project starts with an in-depth brand research to ensure we only
          create products that serve a purpose. We merge art, design, and
          technology into exciting new solutions.
        </p>
      </div>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image alt="" src={illustrationResourceful} />
        <h3>Resourceful</h3>
        <p>
          Everything that we do has a strategic purpose. We use an agile
          approach in all of our projects and value customer collaboration. It
          guarantees superior results that fulfill our clients’ needs.
        </p>
      </div>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image alt="" src={illustrationFriendly} />
        <h3>Friendly</h3>
        <p>
          We are a group of enthusiastic folks who know how to put people first.
          Our success depends on our customers, and we strive to give them the
          best experience a company can provide.
        </p>
      </div>
      <div>
        <h2>Let’s talk about your project</h2>
        <p>
          Ready to take it to the next level? Contact us today and find out how
          our expertise can help your business grow.
        </p>
        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div>
    </>
  );
}

interface ServiceProps {
  children: ReactNode;
}

function Service({ children }: ServiceProps) {
  return <div>{children}</div>;
}

type ServiceLinkProps = Parameters<typeof Link>[0];

function ServiceLink(props: ServiceLinkProps) {
  return <Link {...props} />;
}
