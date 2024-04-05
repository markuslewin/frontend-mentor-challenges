"use client";

import { useEffect, useRef, useState } from "react";
import { RestartDialog } from "./restart";
import Icon from "../../components/icon";
import Image from "next/image";
import logo from "@/app/logo.svg";
import { TieResult, WinResult } from "./result";
import { useRouter } from "next/navigation";
import { GameState, Mark, getCpuIndex } from "../../utils/tic-tac-toe/shared";
import { persistState } from "../../utils/tic-tac-toe/client";
import { invariant } from "@epic-web/invariant";
import { useCursor } from "../../utils/cursor";

export function Game({ initialState }: { initialState: GameState }) {
  const router = useRouter();
  const { state, result, restart, next, choose } = useTicTacToe(initialState);
  const cursor = useCursor();
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

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

  const winningIndexes =
    result.status === "finished" && result.data.type === "win"
      ? result.data.data.indexes
      : null;

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
            onKeyDown={(e) => {
              let nextIndex = -1;
              if (e.key === "ArrowUp") {
                nextIndex = cursor.up();
              } else if (e.key === "ArrowRight") {
                nextIndex = cursor.right();
              } else if (e.key === "ArrowDown") {
                nextIndex = cursor.down();
              } else if (e.key === "ArrowLeft") {
                nextIndex = cursor.left();
              }
              if (nextIndex === -1) {
                return;
              }
              const nextButton = buttonRefs.current[nextIndex];
              invariant(nextButton, "Couldn't find next button");
              nextButton.focus();
              e.preventDefault();
            }}
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
                    className="group aspect-square w-full bg-semi-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] shadow-inner-large shadow-[hsl(201_45%_11%)] grid place-items-center data-[mark=x]:text-light-blue data-[mark=o]:text-light-yellow data-[mark=x]:data-[winning=true]:bg-light-blue data-[mark=x]:data-[winning=true]:shadow-[hsl(178_78%_31%)] data-[mark=o]:data-[winning=true]:bg-light-yellow data-[mark=o]:data-[winning=true]:shadow-[hsl(39_83%_44%)]"
                    type="button"
                    ref={(ref) => {
                      if (ref) {
                        buttonRefs.current.push(ref);
                      }
                    }}
                    tabIndex={cursor.value === i ? 0 : -1}
                    aria-disabled={!!mark}
                    onClick={() => {
                      choose(i);
                    }}
                    data-winning={
                      winningIndexes ? winningIndexes.includes(i) : false
                    }
                    data-mark={mark}
                  >
                    {mark ? (
                      <Icon
                        className="size-[calc(40/96*100%)] tablet:size-[calc(64/140*100%)] group-data-[winning=true]:text-semi-dark-navy"
                        name={mark}
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
      const nextStarterMark = state.starterMark === "o" ? "x" : "o";
      const marks: (Mark | null)[] = Array(9).fill(null);
      if (state.opponent === "cpu" && nextStarterMark !== state.playerOneMark) {
        marks[getCpuIndex(marks)] = state.playerOneMark === "o" ? "x" : "o";
      }

      setState({
        ...state,
        marks,
        starterMark: nextStarterMark,
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

      const playerResult = parseStatus(nextMarks);

      let nextScore = { ...state.score };
      if (playerResult.status === "finished") {
        nextScore = incrementScore(state.score, playerResult.data);
      }

      if (playerResult.status === "playing" && state.opponent === "cpu") {
        nextMarks[getCpuIndex(nextMarks)] =
          state.playerOneMark === "o" ? "x" : "o";

        const cpuResult = parseStatus(nextMarks);

        if (cpuResult.status === "finished") {
          nextScore = incrementScore(state.score, cpuResult.data);
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

function incrementScore(
  score: GameState["score"],
  result: Exclude<ReturnType<typeof parseStatus>, { status: "playing" }>["data"]
) {
  const nextScore = { ...score };
  if (result.type === "tie") {
    nextScore.ties += 1;
  } else if (result.type === "win") {
    nextScore[result.data.winner] += 1;
  } else {
    throw new Error("Invalid finished type");
  }
  return nextScore;
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

  const xWinningIndexes = winningPositions
    .filter((winningPosition) => {
      return winningPosition
        .map((index) => {
          return marks[index];
        })
        .every((mark) => {
          return mark === "x";
        });
    })
    .flat();
  if (xWinningIndexes.length) {
    return {
      status: "finished",
      data: {
        type: "win",
        data: {
          winner: "x",
          indexes: xWinningIndexes,
        },
      },
    } as const;
  }

  const oWinningIndexes = winningPositions
    .filter((winningPosition) => {
      return winningPosition
        .map((index) => {
          return marks[index];
        })
        .every((mark) => {
          return mark === "o";
        });
    })
    .flat();
  if (oWinningIndexes.length) {
    return {
      status: "finished",
      data: {
        type: "win",
        data: { winner: "o", indexes: oWinningIndexes },
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
