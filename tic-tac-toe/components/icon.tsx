import sprite from "@/app/sprite.svg";

export function SpritePreload() {
  return <link rel="preload" as="image" href={sprite.src} />;
}

type Name = "o-outline" | "o" | "restart" | "x-outline" | "icon-x";

export default function Icon({
  name,
  className,
}: {
  className?: string;
  name: Name;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`forced-color-adjust-auto ${className}`}
    >
      <use href={`${sprite.src}#${name}`} />
    </svg>
  );
}
