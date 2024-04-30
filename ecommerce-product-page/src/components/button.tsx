import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      className="mt-4 shape-py-3 shape-px-5 shape-border-2 border-transparent rounded-xl bg-blue-700 hocus:bg-blue-500 transition-colors"
      {...props}
    />
  );
}
