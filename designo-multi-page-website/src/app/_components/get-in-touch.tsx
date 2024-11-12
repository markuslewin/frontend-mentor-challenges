import Image from "next/image";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import bgPatternCallToAction from "~/app/_assets/bg-pattern-call-to-action.svg";

type GetInTouchProps = ComponentPropsWithoutRef<"div">;

export function GetInTouch({ className = "", ...props }: GetInTouchProps) {
  return (
    <div
      className={`${className} center -mb-48 tablet:-mb-20 desktop:-mb-20`}
      {...props}
    >
      <div className="relative isolate rounded-[0.9375rem] bg-peach py-16 text-center text-white tablet:py-14 desktop:py-[4.5rem] desktop:text-start">
        <div className="absolute inset-0 -z-10 grid place-content-center overflow-hidden rounded-inherit">
          <Image
            className="h-[36.5rem] w-auto max-w-none translate-x-7 tablet:translate-x-9 desktop:translate-x-[7.25rem]"
            alt=""
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={bgPatternCallToAction}
          />
        </div>
        <div className="center-inner desktop:flex desktop:items-center desktop:justify-between">
          <div className="basis-[28.6875rem]">
            <h2 className="text-h2 leading-none tracking-normal">
              Let’s talk about your project
            </h2>
            <p className="mt-4">
              Ready to take it to the next level? Contact us today and find out
              how our expertise can help your business grow.
            </p>
          </div>
          <p className="mt-8 flex justify-center desktop:mt-0 desktop:grow desktop:justify-end">
            <Link className="button" href="/contact">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
