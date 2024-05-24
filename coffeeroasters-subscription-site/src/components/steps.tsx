import { cva } from "class-variance-authority";
import { ReactNode } from "react";

export function Root({ children }: { children: ReactNode }) {
  return children;
}

export function Circles({ theme }: { theme?: "dark" | "light" }) {
  return (
    <div className="hidden isolate grid-cols-3 items-center gap-3 tablet:grid desktop:gap-[5.9375rem]">
      <div className="text-pale-orange col-start-1 col-span-2 row-start-1 border-t-2 -z-10 w-[calc(100%+0.75rem)] translate-x-[0.96875rem] desktop:w-[calc(100%+5.9375rem)]" />
      <Circle className="col-start-1" theme={theme} />
      <Circle className="col-start-2" theme={theme} />
      <Circle className="col-start-3" theme={theme} />
    </div>
  );
}

const circleVariants = cva(
  "text-dark-cyan row-start-1 size-[1.9375rem] border-2 rounded-[50%]",
  {
    variants: {
      theme: {
        light: "bg-light-cream",
        dark: "",
      },
    },
  }
);

function Circle({
  className,
  theme = "light",
}: {
  className: string;
  theme?: "light" | "dark";
}) {
  return <div className={circleVariants({ className, theme })} />;
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol
      className="mt-12 grid gap-14 tablet:grid-cols-3 tablet:gap-3 desktop:mt-[4.1875rem] desktop:gap-[5.9375rem]"
      role="list"
    >
      {children}
    </ol>
  );
}

export function Step({ children }: { children: ReactNode }) {
  return <li className="text-center tablet:text-start">{children}</li>;
}

export function Number({ children }: { children: ReactNode }) {
  return (
    <p className="text-pale-orange font-fraunces text-step-number">
      {children}
    </p>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <p className="font-fraunces text-h3 mt-6 tablet:mt-10 desktop:max-w-[15.9375rem] desktop:mt-[2.375rem]">
      {children}
    </p>
  );
}

export function Description({ children }: { children: ReactNode }) {
  return <p className="mt-6 tablet:mt-10 desktop:mt-[2.625rem]">{children}</p>;
}
