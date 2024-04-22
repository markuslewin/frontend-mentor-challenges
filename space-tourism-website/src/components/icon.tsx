import { type SVGProps } from "react";
import spriteHref from "./icons/sprite.svg";
import type { IconName } from "@/icon-name";

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg
      className={`forced-color-adjust-auto ${className}`}
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
