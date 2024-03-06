import { type SVGProps } from "react";
import { type IconName } from "@/icon-name";
import sprite from "./icons/sprite.svg";

const href = sprite.src;

export { href };
export type { IconName };

export function Icon({
  className,
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`forced-color-adjust-auto ${className}`}
      {...props}
    >
      <use href={`${href}#${name}`} />
    </svg>
  );
}
