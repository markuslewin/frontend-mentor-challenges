"use client";

import { useRouter } from "next/navigation";

export function GoBack() {
  const router = useRouter();

  return (
    <div className="center mt-4 tablet:mt-8 desktop:mt-20">
      <div>
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
      </div>
    </div>
  );
}
