import { type SVGProps } from "react";
import spriteHref from "./icons/sprite.svg";
import type { IconName } from "@/icon-name";

export function Icon({
  name,
  changeColor = true,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  changeColor?: boolean;
}) {
  return (
    <svg
      className={`${changeColor ? "forced-color-adjust-auto" : ""} ${className}`}
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
