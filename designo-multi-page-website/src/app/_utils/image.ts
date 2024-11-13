import { getImageProps, type ImageProps } from "next/image";
import { media } from "~/app/_utils/screens";

export function getMediaImageProps({
  alt,
  priority,
  placeholder = "blur",
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
  const { props: mobileImageProps } = getImageProps({
    alt,
    priority,
    placeholder,
    src: breakpoint.mobile,
  });
  const { props: tabletImageProps } = getImageProps({
    alt: "",
    priority,
    placeholder,
    src: breakpoint.tablet,
  });
  const { props: desktopImageProps } = getImageProps({
    alt: "",
    priority,
    placeholder,
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
