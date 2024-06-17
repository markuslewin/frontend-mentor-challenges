import { HTMLAttributes, ImgHTMLAttributes, SourceHTMLAttributes } from "react";

export interface Image {
  src: string;
  width: number;
  height: number;
}

export interface PictureProps extends HTMLAttributes<HTMLPictureElement> {}

export function Picture(props: PictureProps) {
  return <picture {...props} />;
}

export interface SourceProps extends SourceHTMLAttributes<HTMLSourceElement> {
  image: Image;
}

export function Source({ image, ...props }: SourceProps) {
  return (
    <source
      srcSet={image.src}
      width={image.width}
      height={image.height}
      {...props}
    />
  );
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  image: Image;
  priority?: boolean;
}

export function Image({ image, priority, ...props }: ImageProps) {
  return (
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
}
