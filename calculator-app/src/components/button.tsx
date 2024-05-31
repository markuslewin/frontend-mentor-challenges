import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, forwardRef, createContext, useContext } from "react";

const buttonVariants = cva(
  "shadow w-full h-16 rounded-sm grid place-items-center transition-colors tablet:rounded",
  {
    variants: {
      variant: {
        default:
          "bg-key-default text-key-default-foreground shadow-key-default-shadow text-fkey hocus:bg-key-default-hocus",
        destructive:
          "bg-key-reset text-key-reset-foreground shadow-key-reset-shadow text-fkey-special hocus:bg-key-reset-hocus",
        equals:
          "bg-key-equals text-key-equals-foreground shadow-key-equals-shadow text-fkey-special hocus:bg-key-equals-hocus",
      },
      textTransform: {
        uppercase: "uppercase",
      },
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: ReactNode;
  onClick(): void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, textTransform, children, onClick }, ref) => {
    variant = variant ?? "default";
    return (
      <buttonContext.Provider value={{ variant }}>
        <button
          className={buttonVariants({ className, variant, textTransform })}
          ref={ref}
          type="button"
          onClick={onClick}
        >
          {children}
        </button>
      </buttonContext.Provider>
    );
  }
);

const buttonContext = createContext<{
  variant: "default" | "destructive" | "equals";
} | null>(null);

function useButtonContext() {
  const value = useContext(buttonContext);
  if (value === null) {
    throw new Error("useButtonContext must be used inside of a button context");
  }
  return value;
}

const buttonLabelVariants = cva("", {
  variants: {
    variant: {
      default: "translate-y-[0.125rem]",
      destructive: "tablet:translate-y-[0.0625rem]",
      equals: "tablet:translate-y-[0.0625rem]",
    },
  },
});

export function ButtonLabel({ children }: { children: ReactNode }) {
  const { variant } = useButtonContext();
  return <span className={buttonLabelVariants({ variant })}>{children}</span>;
}
