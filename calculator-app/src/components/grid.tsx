import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {}

export function Grid(props: GridProps) {
  return (
    <div
      className="bg-keypad rounded grid grid-cols-4 gap-3 tablet:gap-6 p-6 tablet:p-8"
      role="grid"
      {...props}
    />
  );
}

export function Row({ children }: { children: ReactNode }) {
  return (
    <div className="contents" role="row">
      {children}
    </div>
  );
}

const cellVariants = cva("", { variants: { span: { 2: "col-span-2" } } });

export interface CellProps extends VariantProps<typeof cellVariants> {
  children: ReactNode;
}

export function Cell({ children, span }: CellProps) {
  return (
    <div className={cellVariants({ span })} role="gridcell">
      {children}
    </div>
  );
}
