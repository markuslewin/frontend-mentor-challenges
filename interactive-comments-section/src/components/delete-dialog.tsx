import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { Button } from "./button";

export function DeleteMessage({
  className,
  children,
  onDelete,
}: {
  className?: string;
  children: ReactNode;
  onDelete(): void;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className={className}>
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 p-4 overflow-y-scroll grid place-items-center bg-[hsl(0_0%_0%_/_50%)]">
          <AlertDialog.Content className="grid gap-4 w-full max-w-[25rem] rounded-lg shape-py-6 shape-px-7 shape-border-[1px] border-transparent bg-white text-grayish-blue tablet:gap-5 tablet:shape-p-8">
            <AlertDialog.Title className="text-[1.25rem] font-medium leading-[1.5rem] text-dark-blue tablet:text-heading-l">
              Delete comment
            </AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this comment? This will remove the
              comment and can’t be undone.
            </AlertDialog.Description>
            <div className="grid grid-cols-2 gap-3 tablet:gap-[0.875rem]">
              <AlertDialog.Cancel asChild>
                <Button bgColor="grayish-blue">No, cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onClick={onDelete}>
                <Button bgColor="soft-red">Yes, delete</Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
