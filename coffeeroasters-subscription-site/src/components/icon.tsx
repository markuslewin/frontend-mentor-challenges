import { type SVGProps } from "react";
import spriteHref from "./icons/sprite.svg";
import type { IconName } from "@/icon-name";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg focusable="false" aria-hidden="true" {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
