import { cx } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { Icon } from "./icon";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <span className="isolate relative text-checkbox-foreground grid place-items-center">
      <input
        type="checkbox"
        {...props}
        className={cx(
          "peer bg-origin-border bg-[transparent] col-start-1 row-start-1 appearance-none border rounded-full size-5 clickable-10 checked:bg-checkbox tablet:size-6",
          className
        )}
      />
      <span className="absolute inset-0 pointer-events-none [background:var(--checkbox-border)] rounded-full border border-[transparent] opacity-0 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100 peer-checked:!opacity-0" />
      <Icon
        className="col-start-1 row-start-1 pointer-events-none z-10 w-auto h-[0.4375rem] hidden peer-checked:block tablet:h-[0.5625rem]"
        name="icon-check"
        width="11"
        height="9"
      />
    </span>
  );
}
