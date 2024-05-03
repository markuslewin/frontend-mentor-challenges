import { ButtonHTMLAttributes } from "react";
import "./buttons.css";
import { Slot } from "@radix-ui/react-slot";

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function PrimaryButton({
  className,
  asChild,
  ...props
}: ControlButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={`primary-button ${className}`} {...props} />;
}

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function ControlButton({
  className,
  asChild,
  ...props
}: ControlButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={`control-button ${className}`} {...props} />;
}
