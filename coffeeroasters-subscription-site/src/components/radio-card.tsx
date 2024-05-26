import { cx } from "class-variance-authority";
import {
  InputHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useId,
} from "react";

const context = createContext<{
  inputId: string;
  descriptionId: string;
} | null>(null);

function useRadioCardContext() {
  const value = useContext(context);
  if (value === null)
    throw new Error("useRadioCardContext must be used inside a RadioCard");

  return value;
}

export function Root({ children }: { children: ReactNode }) {
  const inputId = useId();
  const descriptionId = useId();

  return (
    <context.Provider value={{ inputId, descriptionId }}>
      <div className="relative isolate p-6 tablet:min-h-[15.625rem] tablet:py-8 desktop:px-7">
        {children}
      </div>
    </context.Provider>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const { inputId, descriptionId } = useRadioCardContext();

  return (
    <>
      <input
        className={cx("peer sr-only", className)}
        id={inputId}
        type="radio"
        aria-describedby={descriptionId}
        {...props}
      />
    </>
  );
}

export function Label({ children }: { children: ReactNode }) {
  const { inputId } = useRadioCardContext();

  return (
    <label
      className={cx(
        "font-fraunces text-h4 transition-colors",
        "before:bg-lighter-cream before:absolute before:-z-10 before:inset-0 before:rounded-sm before:transition-colors",
        "peer-hover:before:bg-pale-orange peer-focus-visible:before:bg-pale-orange peer-focus-visible:before:outline peer-focus-visible:before:outline-[hsl(0_0%_0%)] peer-focus-visible:before:outline-2",
        "peer-checked:before:!bg-dark-cyan peer-checked:!text-white",
        "after:absolute after:inset-0"
      )}
      htmlFor={inputId}
    >
      {children}
    </label>
  );
}

export function Description({ children }: { children: ReactNode }) {
  const { descriptionId } = useRadioCardContext();

  return (
    <p
      className="peer-checked:!text-white mt-2 tablet:mt-6 transition-colors"
      id={descriptionId}
    >
      {children}
    </p>
  );
}
