import { getImageProps, type ImageProps } from "next/image";
import { media } from "~/app/_utils/screens";

export function getMediaImageProps({
  alt,
  priority,
  breakpoint,
}: {
  alt: ImageProps["alt"];
  priority?: boolean;
  placeholder?: ImageProps["placeholder"];
  breakpoint: {
    mobile: ImageProps["src"];
    tablet: ImageProps["src"];
    desktop: ImageProps["src"];
  };
}) {
  const { props: mobileImgProps } = getImageProps({
    alt,
    priority,
    decoding: "auto",
    src: breakpoint.mobile,
  });
  const { props: tabletImageProps } = getImageProps({
    alt: "",
    priority,
    decoding: "auto",
    src: breakpoint.tablet,
  });
  const { props: desktopImageProps } = getImageProps({
    alt: "",
    priority,
    decoding: "auto",
    src: breakpoint.desktop,
  });

  return {
    mobileImageProps: mobileImgProps,
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
