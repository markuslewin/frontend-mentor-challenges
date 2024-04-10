import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="font-medium uppercase rounded-lg min-w-[6.5rem] shape-py-3 shape-px-4 shape-border-[1px] border-transparent bg-moderate-blue text-white hocus:bg-light-grayish-blue transition-colors"
      {...props}
    />
  );
}
