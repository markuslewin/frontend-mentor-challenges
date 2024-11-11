import { getImageProps, type ImageProps } from "next/image";
import { media } from "~/app/_utils/screens";

export function getMediaImageProps({
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
      // `srcSet` not available for SVGs
      srcSet: tabletImageProps.srcSet ?? tabletImageProps.src,
    },
    desktopSourceProps: {
      media: media.desktop,
      width: desktopImageProps.width,
      height: desktopImageProps.height,
      // `srcSet` not available for SVGs
      srcSet: desktopImageProps.srcSet ?? desktopImageProps.src,
    },
  };
}
