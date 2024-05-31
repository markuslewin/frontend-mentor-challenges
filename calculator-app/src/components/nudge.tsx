import { ReactNode } from "react";

export function Nudge({ x, children }: { x: number; children: ReactNode }) {
  return (
    <span style={{ transform: `translateX(${x / 16}rem)` }}>{children}</span>
  );
}
