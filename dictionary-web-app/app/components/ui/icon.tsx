import { type SVGProps } from "react";
// eslint-disable-next-line import/no-unresolved
import { type IconName } from "@/icon-name";
import href from "./icons/sprite.svg";

export { href };
export { IconName };

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
