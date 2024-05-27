import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "text-light-cream font-fraunces font-black text-[1.125rem] leading-[1.5625rem] rounded-xs px-8 py-4 inline-block transition-colors",
  {
    variants: {
      status: {
        enabled: "bg-dark-cyan hocus:bg-light-cyan",
        disabled: "bg-lighter-pale-orange",
      },
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, status = "enabled", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        className={buttonVariants({ className, status })}
      />
    );
  }
);
