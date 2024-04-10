export function Avatar({
  className,
  alt,
  image,
}: {
  className?: string;
  alt: string;
  image: {
    webp: string;
    png: string;
  };
}) {
  return (
    <picture>
      <source type="image/webp" srcSet={image.webp} />
      <img
        className={`size-8 rounded-full ${className}`}
        alt={alt}
        width={64}
        height={64}
        src={image.png}
      />
    </picture>
  );
}
