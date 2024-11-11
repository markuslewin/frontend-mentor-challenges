import { type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import bgPatternSmallCircle from "~/app/_assets/bg-pattern-small-circle.svg";

export function BgPatternSmallCircle({
  className = "",
  ...props
}: Partial<ComponentPropsWithoutRef<typeof Image>>) {
  return (
    <Image
      className={["absolute -z-10 h-auto w-[12.625rem]", className].join(" ")}
      alt=""
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      src={bgPatternSmallCircle}
      {...props}
    />
  );
}
