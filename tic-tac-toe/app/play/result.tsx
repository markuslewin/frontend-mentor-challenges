"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Icon from "../../components/icon";
import {
  ReactNode,
  RefAttributes,
  useEffect,
  useState,
  useTransition,
} from "react";
import { GameState, Mark } from "../../utils/tic-tac-toe/shared";

export function TieResult({
  onQuit,
  onNextRound,
}: {
  onQuit(): void;
  onNextRound(): void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Result>
      <AlertDialog.Content
        className="bg-semi-dark-navy text-silver pt-10 pb-12 px-6 tablet:py-11 text-center"
        aria-describedby={undefined}
      >
        <AlertDialog.Title className="text-heading-m tablet:text-heading-l">
          Round tied
        </AlertDialog.Title>
        <Actions>
          <Cancel
            disabled={isPending}
            onClick={async () => {
              startTransition(() => {
                onQuit();
              });
            }}
          >
            Quit
            <span className="sr-only" aria-live="assertive">
              {isPending ? " Loading." : null}
            </span>
          </Cancel>
          <Action onClick={onNextRound}>Next round</Action>
        </Actions>
      </AlertDialog.Content>
    </Result>
  );
}

export function WinResult({
  mark,
  opponent,
  playerOneMark,
  onQuit,
  onNextRound,
}: {
  mark: Mark;
  playerOneMark: Mark;
  opponent: GameState["opponent"];
  onQuit(): void;
  onNextRound(): void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Result>
      <AlertDialog.Content className="bg-semi-dark-navy text-silver pt-10 pb-12 px-6 tablet:py-11 text-center">
        <AlertDialog.Title className="font-bold tablet:text-heading-xs">
          {opponent === "cpu"
            ? mark === playerOneMark
              ? "You won!"
              : "Oh no, you lost"
            : mark === playerOneMark
            ? "Player 1 wins!"
            : "Player 2 wins!"}
        </AlertDialog.Title>
        <AlertDialog.Description
          className="mt-4 text-heading-m tablet:text-heading-l flex flex-wrap gap-2 tablet:gap-6 justify-center items-center data-[mark=x]:text-light-blue data-[mark=o]:text-light-yellow"
          data-mark={mark}
        >
          <Icon className="size-7 tablet:size-16" name={mark} />
          <span className="sr-only">{mark === "o" ? "O" : "X"} </span>
          takes the round
        </AlertDialog.Description>
        <Actions>
          <Cancel
            disabled={isPending}
            onClick={async () => {
              startTransition(() => {
                onQuit();
              });
            }}
          >
            Quit
            <span className="sr-only" aria-live="assertive">
              {isPending ? " Loading." : null}
            </span>
          </Cancel>
          <Action onClick={onNextRound}>Next round</Action>
        </Actions>
      </AlertDialog.Content>
    </Result>
  );
}

function Result({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[hsl(0_0%_0%/50%)] fixed inset-0 overflow-y-auto grid items-center">
          {children}
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return (
    <ul
      className="mt-6 tablet:mt-8 flex flex-wrap gap-4 justify-center"
      role="list"
    >
      {children}
    </ul>
  );
}

function Cancel(
  props: AlertDialog.AlertDialogCancelProps & RefAttributes<HTMLButtonElement>
) {
  return (
    <li>
      <AlertDialog.Cancel
        className="bg-silver hocus:bg-silver-hover shadow-inner-small shadow-[hsl(198_17%_50%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors disabled:opacity-50"
        {...props}
      />
    </li>
  );
}

function Action(
  props: AlertDialog.AlertDialogActionProps & RefAttributes<HTMLButtonElement>
) {
  return (
    <li>
      <AlertDialog.Action
        className="bg-light-yellow hocus:bg-light-yellow-hover shadow-inner-small shadow-[hsl(39_83%_44%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
        {...props}
      />
    </li>
  );
}
