"use client";

import { invariant } from "@epic-web/invariant";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  name: HTMLButtonElement["name"];
  value: HTMLButtonElement["value"];
}) {
  const { pending, data } = useFormStatus();

  let isSubmitter = false;
  if (data) {
    const value = data.get(props.name);
    invariant(typeof value === "string", "Value must be a string");
    isSubmitter = value === props.value;
  }

  return (
    <button disabled={pending} {...props}>
      {children}
      <span className="sr-only" aria-live="assertive">
        {" "}
        {pending && isSubmitter ? "Loading." : null}
      </span>
    </button>
  );
}
