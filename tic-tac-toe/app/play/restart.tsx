"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Icon from "../../components/icon";
import { useState } from "react";

export function RestartDialog({ onRestart }: { onRestart(): void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="justify-self-end bg-silver text-semi-dark-navy size-10 tablet:size-[3.25rem] rounded-[0.3125rem] tablet:rounded-[0.625rem] grid place-items-center shadow-inner-small shadow-[hsl(198_17%_50%)] hocus:bg-silver-hover transition-colors">
        <Icon className="size-4 tablet:size-5" name="restart" />
        <span className="sr-only"> Restart game</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[hsl(0_0%_0%/50%)] fixed inset-0 overflow-y-auto grid items-center">
          <Dialog.Content className="bg-semi-dark-navy text-silver py-16 px-6 text-center">
            <Dialog.Title className="text-heading-m tablet:text-heading-l">
              Restart game?
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Are you sure you want to restart the game?
            </Dialog.Description>
            <ul
              className="mt-6 tablet:mt-8 flex flex-wrap gap-4 justify-center"
              role="list"
            >
              <li>
                <Dialog.Close className="bg-silver hocus:bg-silver-hover shadow-inner-small shadow-[hsl(198_17%_50%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors">
                  No, cancel
                </Dialog.Close>
              </li>
              <li>
                <button
                  className="bg-light-yellow hocus:bg-light-yellow-hover shadow-inner-small shadow-[hsl(39_83%_44%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
                  onClick={async () => {
                    onRestart();
                    setIsOpen(false);
                  }}
                >
                  Yes, restart
                </button>
              </li>
            </ul>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
