import { cx } from "class-variance-authority";
import { ImgHTMLAttributes, ReactNode } from "react";

export function Root({ children }: { children: ReactNode }) {
  return (
    <div className="text-light-cream relative min-h-[25rem] py-24 flex flex-col justify-center tablet:py-28 desktop:min-h-[28.125rem] desktop:py-[7.25rem]">
      {children}
    </div>
  );
}

export function Image({ ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      className={cx(
        "absolute inset-0 size-full object-cover -z-10 rounded",
        props.className
      )}
    />
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="layout-grid t-center-inner px-gutter tablet:px-0 desktop:px-gutter">
        {children}
      </div>
    </div>
  );
}

export function Text({ children }: { children: ReactNode }) {
  return (
    <div className="col-[3_/_span_13] text-center tablet:text-start desktop:col-start-1 desktop:col-span-11">
      {children}
    </div>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <h1 className="font-fraunces text-h1">{children}</h1>;
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="mt-6 mx-auto max-w-5 tablet:mx-0">{children}</p>;
}
