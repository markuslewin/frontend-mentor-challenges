import { TextareaHTMLAttributes, forwardRef, useState } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ defaultValue, ...props }, ref) => {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div className="relative w-full">
      <div className="invisible whitespace-pre-wrap min-h-24 shape-py-3 shape-px-6 shape-border-[1px]">
        {`${value} `}
      </div>
      <textarea
        className="absolute inset-0 size-full overflow-hidden resize-none rounded-lg shape-py-3 shape-px-6 shape-border-[1px] border-light-gray text-dark-blue placeholder:text-grayish-blue caret-moderate-blue hocus:border-moderate-blue transition-colors"
        ref={ref}
        {...props}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
});
