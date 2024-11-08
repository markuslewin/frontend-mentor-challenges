import Image from "next/image";
import { type ComponentPropsWithoutRef } from "react";
import bgPatternLeaf from "~/app/_assets/bg-pattern-leaf.svg";

interface LeafProps extends Partial<ComponentPropsWithoutRef<typeof Image>> {
  upsideDown?: boolean;
}

export function Leaf({ className, upsideDown }: LeafProps) {
  return (
    <Image
      className={[
        "h-[37.125rem] w-auto max-w-none",
        className,
        upsideDown ? "rotate-180" : "",
      ].join(" ")}
      alt=""
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      src={bgPatternLeaf}
    />
  );
}
