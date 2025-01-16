"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useId } from "react";

type GoBackProps = ComponentProps<"div">;

export function GoBack(props: GoBackProps) {
  const labelId = useId();
  const router = useRouter();

  return (
    <div className="center mt-4 tablet:mt-8 desktop:mt-20" {...props}>
      <nav aria-labelledby={labelId}>
        <h2 className="sr-only" id={labelId}>
          Go back
        </h2>
        <button
          className="transition-colors hocus:text-D87D4A"
          type="button"
          onClick={() => {
            // todo: Store last visited page on _this_ site
            router.back();
          }}
        >
          Go Back
        </button>
      </nav>
    </div>
  );
}
