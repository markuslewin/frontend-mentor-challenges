import * as Collapsible from "@radix-ui/react-collapsible";
import {
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "@radix-ui/react-collapsible";
import { cx } from "class-variance-authority";
import { ReactNode, useEffect, useRef } from "react";

export function Root(props: CollapsibleProps) {
  const { onOpenChange } = props;
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current === null) return;
      if (!(e.target instanceof Node)) return;

      if (!ref.current.contains(e.target)) {
        onOpenChange?.(false);
      }
    }
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [onOpenChange]);

  // Close when focusing element outside
  useEffect(() => {
    function handleFocusIn(event: FocusEvent) {
      if (ref.current === null) return;
      if (!(event.target instanceof Node)) return;

      if (!ref.current.contains(event.target)) {
        onOpenChange?.(false);
      }
    }
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [onOpenChange]);

  return <Collapsible.Root {...props} ref={ref}></Collapsible.Root>;
}

export function Trigger({ className, ...props }: CollapsibleTriggerProps) {
  return (
    <Collapsible.Trigger
      {...props}
      className={cx("text-dark-grey-blue block clickable-12", className)}
    />
  );
}

export function Content({ children }: { children: ReactNode }) {
  return (
    <Collapsible.Content className="bg-gradient-to-b from-light-cream from-[16rem] to-light-cream/50 to-[36.0625rem] absolute z-10 top-[5.625rem] right-0 bottom-0 left-0 pt-10">
      {children}
    </Collapsible.Content>
  );
}
