import * as DialogPrimitive from "@radix-ui/react-dialog";
import { $open } from "../utils/store";
import { useStore } from "@nanostores/react";

export const SuccessDialog = () => {
  const open = useStore($open);

  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dialog__overlay" />
        <DialogPrimitive.Content className="dialog__content card">
          <img alt="" src="/images/icon-check.svg" />
          <DialogPrimitive.Title className="dialog__heading">
            Thanks for your support!
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-4">
            Your pledge brings us one step closer to sharing Mastercraft Bamboo
            Monitor Riser worldwide. You will get an email once our campaign is
            completed.
          </DialogPrimitive.Description>
          <a className="button" href="/">
            Got it!
          </a>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
