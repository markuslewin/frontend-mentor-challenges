import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { GameState, Mark } from "./page";
import Icon from "../../components/icon";
import { ReactNode } from "react";

export function TieResult({
  onQuit,
  onNextRound,
}: {
  onQuit(): void;
  onNextRound(): void;
}) {
  return (
    <Result>
      <AlertDialog.Content
        className="bg-semi-dark-navy text-silver pt-10 pb-12 px-6 tablet:py-11 text-center"
        aria-describedby={undefined}
      >
        <AlertDialog.Title className="text-heading-m tablet:text-heading-l">
          Round tied
        </AlertDialog.Title>
        <ResultActions onQuit={onQuit} onNextRound={onNextRound} />
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
        <ResultActions onQuit={onQuit} onNextRound={onNextRound} />
      </AlertDialog.Content>
    </Result>
  );
}

function Result({ children }: { children: ReactNode }) {
  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[hsl(0_0%_0%/50%)] fixed inset-0 overflow-y-auto grid items-center">
          {children}
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function ResultActions({
  onQuit,
  onNextRound,
}: {
  onQuit(): void;
  onNextRound(): void;
}) {
  return (
    <ul
      className="mt-6 tablet:mt-8 flex flex-wrap gap-4 justify-center"
      role="list"
    >
      <li>
        <AlertDialog.Cancel
          className="bg-silver hocus:bg-silver-hover shadow-inner-small shadow-[hsl(198_17%_50%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
          onClick={onQuit}
        >
          Quit
        </AlertDialog.Cancel>
      </li>
      <li>
        <AlertDialog.Action
          className="bg-light-yellow hocus:bg-light-yellow-hover shadow-inner-small shadow-[hsl(39_83%_44%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
          onClick={onNextRound}
        >
          Next round
        </AlertDialog.Action>
      </li>
    </ul>
  );
}
