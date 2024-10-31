import { forwardRef, type SVGProps } from "react";
import { type IconName } from "@/icon-name";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    return (
      <svg ref={ref} focusable="false" aria-hidden="true" {...props}>
        <use href={`/sprite.svg#${name}`} />
      </svg>
    );
  },
);
Icon.displayName = "Icon";
