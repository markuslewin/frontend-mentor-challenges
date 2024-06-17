import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="mt-2 w-full rounded-xl border-[transparent] bg-input transition-colors shape-px-5 shape-py-3 shape-border-2 hocus:border-input-border-hocus"
      {...props}
    />
  );
}
