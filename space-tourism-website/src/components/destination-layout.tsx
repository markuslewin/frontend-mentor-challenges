import { Outlet } from "react-router-dom";

export function DestinationLayout() {
  return (
    <div className="mt-6 tablet:mt-10 desktop:mt-[4.75rem] max-w-[74.25rem] w-full mx-auto px-6 tablet:px-10">
      <h1 className="text-FFFFFF font-barlow-condensed text-nav-text tablet:text-[1.25rem] tablet:leading-[1.5rem] tablet:tracking-[0.21125rem] desktop:text-heading-5 uppercase flex gap-[1.125rem] desktop:gap-7">
        <span className="text-FFFFFF/25 font-bold" aria-hidden="true">
          01
        </span>
        Pick your destination
      </h1>
      <Outlet />
    </div>
  );
}
