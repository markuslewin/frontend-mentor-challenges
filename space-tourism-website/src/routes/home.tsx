import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="mt-12 tablet:mt-[6.625rem] desktop:mt-48 max-w-[74.25rem] mx-auto w-full pb-12 tablet:pb-[5.625rem] desktop:pb-[8.1875rem] px-6 tablet:px-10 desktop:grid desktop:grid-cols-2 desktop:items-end">
      <div className="mx-auto desktop:mx-0 max-w-[28.125rem] text-center desktop:text-start">
        <h1 className="font-barlow-condensed text-subheading-2 tablet:text-[1.25rem] tablet:tracking-[0.21125rem] tablet:leading-[1.5rem] desktop:text-heading-5 uppercase">
          So, you want to travel to{" "}
          <span className="text-FFFFFF mt-4 tablet:mt-6 block font-bellefair text-[5rem] tracking-normal leading-[6.25rem] tablet:text-[9.375rem] tablet:leading-[9.375rem] desktop:text-heading-1">
            Space
          </span>
        </h1>
        <p className="mt-4 tablet:mt-6">
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </div>
      <Link
        className="explore-btn bg-FFFFFF text-0B0D17 mx-auto desktop:mx-0 desktop:justify-self-end mt-16 tablet:mt-24 grid place-items-center rounded-full size-[9.375rem] tablet:size-[15.125rem] desktop:size-[17.125rem] font-bellefair text-[1.25rem] leading-[1.4375rem] tablet:text-heading-4 tracking-[0.078125rem] tablet:tracking-[0.125rem] uppercase"
        to="/destination"
      >
        Explore
      </Link>
    </div>
  );
}
