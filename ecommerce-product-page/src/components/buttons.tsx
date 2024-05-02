import { ButtonHTMLAttributes } from "react";
import "./buttons.css";
import { Slot } from "@radix-ui/react-slot";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function PrimaryButton({
  className,
  asChild,
  ...props
}: PrimaryButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={`primary-button ${className}`} {...props} />;
}
