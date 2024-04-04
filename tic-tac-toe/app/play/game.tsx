"use client";

import { useEffect, useState } from "react";
import { RestartDialog } from "./restart";
import Icon from "../../components/icon";
import Image from "next/image";
import logo from "@/app/logo.svg";
import { TieResult, WinResult } from "./result";
import { useRouter } from "next/navigation";
import { GameState, Mark } from "../../utils/tic-tac-toe/shared";
import { persistState } from "../../utils/tic-tac-toe/client";
import { invariant } from "@epic-web/invariant";

export function Game({ initialState }: { initialState: GameState }) {
  const router = useRouter();
  const { state, result, restart, next, choose } = useTicTacToe(initialState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  function handleQuit() {
    router.replace("/");
  }

  let nextMark: Mark | null = null;
  if (result.status === "finished") {
    // The last mark
    nextMark = getNextMark(state.marks, state.starterMark) === "o" ? "x" : "o";
  } else if (result.status === "playing") {
    nextMark = getNextMark(state.marks, state.starterMark);
  }
  invariant(nextMark, "Invalid next mark");

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

              return (
                <li key={position}>
                  <button
                    className="group aspect-square w-full bg-semi-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] shadow-inner-large shadow-[hsl(201_45%_11%)] grid place-items-center"
                    type="button"
                    aria-disabled={!!mark}
                    onClick={() => {
                      choose(i);
                    }}
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
          <h2 className="sr-only" id="score-label">
            Score
          </h2>
          <ul
            className="grid grid-cols-3 gap-5 text-center text-[0.75rem] leading-[0.9375rem] tracking-[0.046875rem] font-medium tablet:text-body"
            aria-labelledby="score-label"
          >
            <li className="bg-light-blue text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              X (
              {state.opponent === "cpu"
                ? state.playerOneMark === "o"
                  ? "CPU"
                  : "You"
                : state.playerOneMark === "o"
                ? "P2"
                : "P1"}
              ):{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                {state.score.x}
              </strong>
            </li>
            <li className="bg-silver text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              Ties:{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                {state.score.ties}
              </strong>
            </li>
            <li className="bg-light-yellow text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              O (
              {state.opponent === "cpu"
                ? state.playerOneMark === "o"
                  ? "You"
                  : "CPU"
                : state.playerOneMark === "o"
                ? "P1"
                : "P2"}
              ):{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                {state.score.o}
              </strong>
            </li>
          </ul>
        </footer>
      </div>
      {result.status === "finished" ? (
        result.data.type === "tie" ? (
          <TieResult onQuit={handleQuit} onNextRound={next} />
        ) : result.data.type === "win" ? (
          <WinResult
            mark={result.data.data.winner}
            opponent={state.opponent}
            playerOneMark={state.playerOneMark}
            onQuit={handleQuit}
            onNextRound={next}
          />
        ) : null
      ) : null}
    </div>
  );
}

function useTicTacToe(initialState: GameState) {
  const [state, setState] = useState(initialState);

  const result = parseStatus(state.marks);

  return {
    state,
    result,
    restart() {
      setState({
        ...state,
        marks: Array(9).fill(null),
      });
    },
    next() {
      setState({
        ...state,
        marks: Array(9).fill(null),
        starterMark: state.starterMark === "o" ? "x" : "o",
      });
    },
    choose(index: number) {
      invariant(0 <= index && index < 9, "Invalid index range");

      if (state.marks[index] !== null) {
        return;
      }

      const nextMark = getNextMark(state.marks, state.starterMark);

      const nextMarks = [...state.marks];
      nextMarks[index] = nextMark;

      const nextResult = parseStatus(nextMarks);

      const nextScore = { ...state.score };
      if (nextResult.status === "finished") {
        if (nextResult.data.type === "tie") {
          nextScore.ties += 1;
        } else if (nextResult.data.type === "win") {
          const { winner } = nextResult.data.data;
          nextScore[winner] += 1;
        } else {
          throw new Error("Invalid finished type");
        }
      }

      setState({
        ...state,
        marks: nextMarks,
        score: nextScore,
      });
    },
  };
}

function parseStatus(marks: (Mark | null)[]) {
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

  const isXWin = winningPositions.some((winningPosition) => {
    return winningPosition
      .map((index) => {
        return marks[index];
      })
      .every((mark) => {
        return mark === "x";
      });
  });
  if (isXWin) {
    return {
      status: "finished",
      data: {
        type: "win",
        data: {
          winner: "x",
        },
      },
    } as const;
  }

  const isOWin = winningPositions.some((winningPosition) => {
    return winningPosition
      .map((index) => {
        return marks[index];
      })
      .every((mark) => {
        return mark === "o";
      });
  });
  if (isOWin) {
    return {
      status: "finished",
      data: {
        type: "win",
        data: { winner: "o" },
      },
    } as const;
  }

  const isTie = marks.every((mark) => {
    return mark !== null;
  });
  if (isTie) {
    return { status: "finished", data: { type: "tie" } } as const;
  }

  return {
    status: "playing",
  } as const;
}

function getNextMark(marks: (Mark | null)[], starterMark: Mark) {
  const markedCount = marks.filter((mark) => {
    return mark !== null;
  }).length;
  return markedCount % 2 === 0 ? starterMark : starterMark === "o" ? "x" : "o";
}
