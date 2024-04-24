import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export function DestinationLayout() {
  return (
    <Sublayout>
      <SublayoutHeading>
        <SublayoutHeadingNumber>01</SublayoutHeadingNumber>
        Pick your destination
      </SublayoutHeading>
      <Outlet />
    </Sublayout>
  );
}

export function CrewLayout() {
  return (
    <Sublayout>
      <SublayoutHeading>
        <SublayoutHeadingNumber>02</SublayoutHeadingNumber>
        Meet your crew
      </SublayoutHeading>
      <Outlet />
    </Sublayout>
  );
}

export function TechnologyLayout() {
  return (
    <Sublayout>
      <SublayoutHeading>
        <SublayoutHeadingNumber>03</SublayoutHeadingNumber>
        Space launch 101
      </SublayoutHeading>
      <Outlet />
    </Sublayout>
  );
}

function Sublayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 tablet:mt-10 desktop:mt-[4.75rem]">{children}</div>
  );
}

function SublayoutHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-FFFFFF mx-auto max-w-[74.25rem] font-barlow-condensed text-nav-text tablet:text-[1.25rem] tablet:leading-[1.5rem] tablet:tracking-[0.21125rem] desktop:text-heading-5 px-6 tablet:px-10 uppercase flex justify-center tablet:justify-normal gap-[1.125rem] desktop:gap-7">
      {children}
    </h1>
  );
}

function SublayoutHeadingNumber({ children }: { children: ReactNode }) {
  return (
    <span className="text-FFFFFF/25 font-bold" aria-hidden="true">
      {children}
    </span>
  );
}
