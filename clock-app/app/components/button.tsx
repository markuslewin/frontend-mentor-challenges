import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function Button({ asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className="mt-4 rounded-xl border-[transparent] bg-button text-button-foreground transition-colors shape-px-5 shape-py-3 shape-border-2 hocus:bg-button-hocus"
      {...props}
    />
  );
}
