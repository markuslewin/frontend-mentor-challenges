import { cx } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { Icon } from "./icon";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <span className="isolate text-checkbox-foreground grid place-items-center">
      <input
        type="checkbox"
        {...props}
        className={cx(
          "peer bg-origin-border bg-[transparent] col-start-1 row-start-1 appearance-none border rounded-full size-5 clickable-10 checked:bg-checkbox tablet:size-6",
          className
        )}
      />
      <Icon
        className="col-start-1 row-start-1 pointer-events-none z-10 w-auto h-[0.4375rem] hidden peer-checked:block tablet:h-[0.5625rem]"
        name="icon-check"
        width="11"
        height="9"
      />
    </span>
  );
}
