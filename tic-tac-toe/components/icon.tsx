import sprite from "@/app/sprite.svg";

export function SpritePreload() {
  return <link rel="preload" as="image" href={sprite.src} />;
}

type Name = "o-outline" | "o" | "restart" | "x-outline" | "x";

export default function Icon({
  name,
  className,
  ...props
}: {
  className?: string;
  name: Name;
} & React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`forced-color-adjust-auto ${className}`}
      {...props}
    >
      <use href={`${sprite.src}#${name}`} />
    </svg>
  );
}
