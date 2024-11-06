import Link from "next/link";
import { type ComponentPropsWithoutRef, useId } from "react";
import { Icon } from "~/app/_components/icon";
import desktopWebDesignUrl from "~/app/_assets/desktop/image-web-design-large.jpg";
import tabletWebDesignUrl from "~/app/_assets/tablet/image-web-design.jpg";
import mobileWebDesignUrl from "~/app/_assets/mobile/image-web-design.jpg";
import desktopAppDesignUrl from "~/app/_assets/desktop/image-app-design.jpg";
import tabletAppDesignUrl from "~/app/_assets/tablet/image-app-design.jpg";
import mobileAppDesignUrl from "~/app/_assets/mobile/image-app-design.jpg";
import desktopGraphicDesignUrl from "~/app/_assets/desktop/image-graphic-design.jpg";
import tabletGraphicDesignUrl from "~/app/_assets/tablet/image-graphic-design.jpg";
import mobileGraphicDesignUrl from "~/app/_assets/mobile/image-graphic-design.jpg";
import { getMediaImageProps } from "~/app/_utils/image";

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

interface ServiceProps extends ComponentPropsWithoutRef<typeof Link> {
  heading: string;
  href: string;
  image: ReturnType<typeof getMediaImageProps>;
}

function Service({ className = "", heading, image, ...props }: ServiceProps) {
  const labelId = useId();

  return (
    <Link
      className={`${className} group relative isolate flex flex-col justify-center gap-3 rounded bg-black py-24 text-center uppercase text-white tablet:gap-6 tablet:py-14 desktop:py-28`}
      aria-labelledby={labelId}
      {...props}
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
      <h3 className="text-service" id={labelId}>
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

type SpecializedServiceProps = Partial<ServiceProps>;

export function WebDesignService(props: SpecializedServiceProps) {
  return (
    <Service
      heading="Web design"
      image={webDesignImageProps}
      href="/web-design"
      {...props}
    />
  );
}

export function AppDesignService(props: SpecializedServiceProps) {
  return (
    <Service
      heading="App design"
      href="/app-design"
      image={appDesignImageProps}
      {...props}
    />
  );
}

export function GraphicDesignService(props: SpecializedServiceProps) {
  return (
    <Service
      heading="Graphic design"
      href="/graphic-design"
      image={graphicDesignImageProps}
      {...props}
    />
  );
}
