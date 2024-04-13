import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "font-medium uppercase rounded-lg min-w-[6.5rem] shape-py-3 shape-px-4 shape-border-[1px] border-transparent transition-colors",
  {
    variants: {
      bgColor: {
        "moderate-blue":
          "bg-moderate-blue text-white hocus:bg-light-grayish-blue",
        "grayish-blue":
          "bg-grayish-blue text-white hocus:bg-[hsl(211_10%_80%)]",
        "soft-red": "bg-soft-red text-white hocus:bg-pale-red",
      },
    },
    defaultVariants: {
      bgColor: "moderate-blue",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, bgColor, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ className, bgColor })}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button };
