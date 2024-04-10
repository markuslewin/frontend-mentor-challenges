import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      className="h-24 w-full resize-none rounded-lg shape-py-3 shape-px-6 shape-border-[1px] border-light-gray text-dark-blue placeholder:text-grayish-blue caret-moderate-blue hocus:border-moderate-blue transition-colors"
      ref={ref}
      {...props}
    />
  );
});
