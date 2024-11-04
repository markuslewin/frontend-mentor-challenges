import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type GetInTouchProps = ComponentPropsWithoutRef<"div">;

export function GetInTouch({ className = "", ...props }: GetInTouchProps) {
  return (
    <div
      className={`${className} center -mb-48 tablet:-mb-20 desktop:-mb-20`}
      {...props}
    >
      <div className="relative rounded-[0.9375rem] bg-peach py-16 text-center text-white tablet:py-14 desktop:py-20 desktop:text-start">
        <div className="center-inner desktop:grid desktop:grid-cols-[minmax(auto,28.6875rem)_auto] desktop:items-center desktop:justify-between">
          <div>
            <h2 className="text-h2">Let’s talk about your project</h2>
            <p className="mt-3 tablet:mt-2">
              Ready to take it to the next level? Contact us today and find out
              how our expertise can help your business grow.
            </p>
          </div>
          <p className="mt-8 flex justify-center desktop:mt-0">
            <Link className="button" href="/contact">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
