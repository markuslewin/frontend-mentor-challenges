import { Slot } from "@radix-ui/react-slot";
import { cx } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        className={cx(
          "bg-dark-cyan text-light-cream font-fraunces font-black text-[1.125rem] leading-[1.5625rem] rounded-xs px-8 py-4 inline-block hocus:bg-light-cyan transition-colors",
          props.className
        )}
      />
    );
  }
);
