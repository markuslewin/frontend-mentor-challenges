import { autoUpdate } from "@floating-ui/dom";

export const myAutoUpdate: typeof autoUpdate = (
  reference,
  floating,
  ...args
) => {
  const cleanup = autoUpdate(reference, floating, ...args);
  return () => {
    cleanup();
    Object.assign(floating.style, {
      left: null,
      top: null,
    });
  };
};
