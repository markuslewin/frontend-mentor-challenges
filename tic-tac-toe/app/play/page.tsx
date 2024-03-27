"use client";

import logo from "@/app/logo.svg";
import Image from "next/image";
import Icon from "../../components/icon";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TieResult, WinResult } from "./result";
import { invariant } from "@epic-web/invariant";

const Mark = z.union([z.literal("x"), z.literal("o")]);

const GameState = z.object({
  playerOneMark: Mark,
  starterMark: Mark,
  opponent: z.union([z.literal("cpu"), z.literal("player")]),
  marks: z.array(Mark.or(z.literal(null))).length(9),
});

export type GameState = z.infer<typeof GameState>;
export type Mark = z.infer<typeof Mark>;

export default function PlayRoute() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return <Play />;
}

function Play() {
  const router = useRouter();
  const [state, setState] = useState(() => {
    try {
      return GameState.parse(JSON.parse(localStorage.getItem("game")!));
    } catch (error) {
      console.warn("Failed to parse game state", error);
      return null;
    }
  });

  useEffect(() => {
    if (state) {
      return;
    }
    router.replace("/");
  }, [router, state]);

  if (!state) {
    // Redirecting to menu
    return null;
  }

  function handleQuit() {
    router.push("/");
  }

  function handleNextRound() {
    invariant(state, "No state");
    setState({
      marks: Array(9).fill(null),
      starterMark: state.starterMark === "o" ? "x" : "o",
      opponent: state.opponent,
      playerOneMark: state.playerOneMark,
    });
  }

  function opposite(mark: z.infer<typeof Mark>) {
    if (mark === "o") {
      return "x";
    }
    return "o";
  }

  function hasWon(marks: (Mark | null)[], mark: Mark) {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningPositions.some((winningPosition) => {
      return winningPosition
        .map((index) => {
          return marks[index];
        })
        .every((m) => m === mark);
    });
  }

  const emptyCount = state.marks.filter((mark) => {
    return mark === null;
  }).length;
  const nextMark =
    emptyCount % 2 ? state.starterMark : opposite(state.starterMark);

  const result = hasWon(state.marks, "x")
    ? ({ status: "win", mark: "x" } as const)
    : hasWon(state.marks, "o")
    ? ({ status: "win", mark: "o" } as const)
    : emptyCount <= 0
    ? ({ status: "tie" } as const)
    : ({ status: "ongoing" } as const);

  return (
    <div className="min-h-screen grid grid-cols-[minmax(0,28.75rem)] grid-rows-[1fr_auto_1fr] justify-center items-start tablet:grid-rows-none tablet:place-content-center p-6">
      <header className="grid grid-cols-3 gap-5 items-center">
        <h1>
          <Image className="w-[4.5rem]" alt="Tic-tac-toe" src={logo} priority />
        </h1>
        <div className="bg-semi-dark-navy text-silver font-bold tablet:text-heading-xs p-[0.5625rem] pb-[0.8125rem] tablet:p-[0.8125rem] tablet:pb-[1.1875rem] shadow-inner-small shadow-[hsl(201_45%_11%)] rounded-[0.625rem] grid justify-center">
          <p className="grid grid-cols-[max-content_1fr] gap-2 tablet:gap-3 items-center">
            <Icon className="size-4 tablet:size-5" name={nextMark} />
            <span className="sr-only">
              {nextMark === "o" ? "O" : "X"}&apos;s{" "}
            </span>
            turn
          </p>
        </div>
        <Dialog.Root>
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
                    <Dialog.Close
                      className="bg-light-yellow hocus:bg-light-yellow-hover shadow-inner-small shadow-[hsl(39_83%_44%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
                      onClick={() => {
                        setState({
                          marks: Array(9).fill(null),
                          starterMark: state.starterMark === "o" ? "x" : "o",
                          opponent: state.opponent,
                          playerOneMark: state.playerOneMark,
                        });
                      }}
                    >
                      Yes, restart
                    </Dialog.Close>
                  </li>
                </ul>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </header>
      <div>
        <main className="mt-5">
          <h2 className="sr-only">Game</h2>
          <ul className="grid grid-cols-3 gap-5" role="list">
            {state.marks.map((mark, i) => {
              const position = [
                "3A",
                "3B",
                "3C",
                "2A",
                "2B",
                "2C",
                "1A",
                "1B",
                "1C",
              ][i];
              const disabled = !!mark;

              return (
                <li key={position}>
                  <button
                    className="group aspect-square w-full bg-semi-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] shadow-inner-large shadow-[hsl(201_45%_11%)] grid place-items-center"
                    aria-disabled={disabled}
                    onClick={
                      disabled
                        ? () => {}
                        : () => {
                            setState({
                              ...state,
                              marks: state.marks.map((mark, _i) => {
                                if (_i === i) {
                                  return nextMark;
                                }
                                return mark;
                              }),
                            });
                          }
                    }
                  >
                    {mark ? (
                      <Icon
                        className="size-10 tablet:size-16 data-[mark=x]:text-light-blue data-[mark=o]:text-light-yellow"
                        name={mark}
                        data-mark={mark}
                      />
                    ) : null}
                    {mark ? null : (
                      <Icon
                        className="size-10 tablet:size-16 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 data-[mark=x]:text-light-blue data-[mark=o]:text-light-yellow"
                        name={nextMark === "o" ? "o-outline" : "x-outline"}
                        data-mark={nextMark}
                      />
                    )}
                    <span className="sr-only">Choose {position}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </main>
        <footer className="mt-5">
          <h2 className="sr-only">Points</h2>
          <ul className="grid grid-cols-3 gap-5 text-center text-[0.75rem] leading-[0.9375rem] tracking-[0.046875rem] font-medium tablet:text-body">
            <li className="bg-light-blue text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              X (You):{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                0
              </strong>
            </li>
            <li className="bg-silver text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              Ties:{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                0
              </strong>
            </li>
            <li className="bg-light-yellow text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              O (CPU):{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                0
              </strong>
            </li>
          </ul>
        </footer>
      </div>
      {result.status === "tie" ? (
        <TieResult onQuit={handleQuit} onNextRound={handleNextRound} />
      ) : result.status === "win" ? (
        <WinResult
          mark={result.mark}
          opponent={state.opponent}
          playerOneMark={state.playerOneMark}
          onQuit={handleQuit}
          onNextRound={handleNextRound}
        />
      ) : null}
    </div>
  );
}
