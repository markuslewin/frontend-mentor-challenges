import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="mt-2 w-full shape-py-3 shape-px-5 shape-border-2 border-[transparent] rounded-xl bg-input hocus:border-input-border-hocus transition-colors"
      {...props}
    />
  );
}
