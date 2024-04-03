"use client";

import { useEffect, useState, useTransition } from "react";
import { GameState, Mark } from "./page";
import { RestartDialog } from "./restart";
import Icon from "../../components/icon";
import Image from "next/image";
import logo from "@/app/logo.svg";
import { TieResult, WinResult } from "./result";
import { useRouter } from "next/navigation";

function opposite(mark: Mark) {
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

function useTicTacToe(initialState: GameState) {
  const [state, setState] = useState(initialState);

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

  return {
    state,
    nextMark,
    result,
    // todo: Spread old state
    restart() {
      setState({
        marks: Array(9).fill(null),
        // todo: Don't change starter mark
        starterMark: state.starterMark === "o" ? "x" : "o",
        opponent: state.opponent,
        playerOneMark: state.playerOneMark,
      });
    },
    next() {
      setState({
        marks: Array(9).fill(null),
        starterMark: state.starterMark === "o" ? "x" : "o",
        opponent: state.opponent,
        playerOneMark: state.playerOneMark,
      });
    },
    choose(index: number) {
      setState({
        ...state,
        marks: state.marks.map((mark, i) => {
          if (i === index) {
            return nextMark;
          }
          return mark;
        }),
      });
    },
  };
}

export function Game({ initialState }: { initialState: GameState }) {
  const router = useRouter();
  const { state, nextMark, result, restart, next, choose } =
    useTicTacToe(initialState);

  useEffect(() => {
    document.cookie = `game=${encodeURIComponent(JSON.stringify(state))}`;
  }, [state]);

  function handleQuit() {
    router.replace("/");
  }

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
        <RestartDialog onRestart={restart} />
      </header>
      <div>
        <main className="mt-5">
          <h2 className="sr-only" id="board-label">
            Game
          </h2>
          <ul
            className="grid grid-cols-3 gap-5"
            role="list"
            aria-labelledby="board-label"
          >
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
                    type="button"
                    aria-disabled={disabled}
                    onClick={
                      disabled
                        ? () => {}
                        : () => {
                            choose(i);
                          }
                    }
                  >
                    {mark ? (
                      <Icon
                        className="size-[calc(40/96*100%)] tablet:size-[calc(64/140*100%)] data-[mark=x]:text-light-blue data-[mark=o]:text-light-yellow"
                        name={mark}
                        data-mark={mark}
                      />
                    ) : null}
                    {mark ? null : (
                      <Icon
                        className="size-[calc(40/96*100%)] tablet:size-[calc(64/140*100%)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 data-[mark=x]:text-light-blue data-[mark=o]:text-light-yellow"
                        name={nextMark === "o" ? "o-outline" : "x-outline"}
                        data-mark={nextMark}
                      />
                    )}
                    <span className="sr-only">
                      {mark === "o"
                        ? "O"
                        : mark === "x"
                        ? "X"
                        : `Choose ${position}`}
                    </span>
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
        <TieResult onQuit={handleQuit} onNextRound={next} />
      ) : result.status === "win" ? (
        <WinResult
          mark={result.mark}
          opponent={state.opponent}
          playerOneMark={state.playerOneMark}
          onQuit={handleQuit}
          onNextRound={next}
        />
      ) : null}
    </div>
  );
}
