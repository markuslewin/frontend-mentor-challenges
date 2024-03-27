"use client";

import logo from "@/app/logo.svg";
import Image from "next/image";
import Icon from "../../components/icon";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const GameState = z.object({
  playerOneMark: z.union([z.literal("x"), z.literal("o")]),
  opponent: z.union([z.literal("cpu"), z.literal("player")]),
  moves: z.array(
    z.object({
      player: z.union([
        z.literal("cpu"),
        z.literal("player-one"),
        z.literal("player-two"),
      ]),
      index: z.number().gte(0).lt(8),
    })
  ),
});

export type GameState = z.infer<typeof GameState>;

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
  const [winOpen, setWinOpen] = useState(false);
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

  return (
    <div className="min-h-screen grid grid-cols-[minmax(0,28.75rem)] grid-rows-[1fr_auto_1fr] justify-center items-start tablet:grid-rows-none tablet:place-content-center p-6">
      <header className="grid grid-cols-3 gap-5 items-center">
        <h1>
          <Image className="w-[4.5rem]" alt="Tic-tac-toe" src={logo} priority />
        </h1>
        <div className="bg-semi-dark-navy text-silver font-bold tablet:text-heading-xs p-[0.5625rem] pb-[0.8125rem] tablet:p-[0.8125rem] tablet:pb-[1.1875rem] shadow-inner-small shadow-[hsl(201_45%_11%)] rounded-[0.625rem] grid justify-center">
          <p className="grid grid-cols-[max-content_1fr] gap-2 tablet:gap-3 items-center">
            <Icon className="size-4 tablet:size-5" name="x" />
            <span className="sr-only">X&apos;s </span> turn
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
                        console.log("Restart game");
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
            {(["o", "x", null, null, null, null, null, "o", null] as const).map(
              (marker, i) => {
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
                const disabled = !!marker;

                return (
                  <li key={position}>
                    <button
                      className="group aspect-square w-full bg-semi-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] shadow-inner-large shadow-[hsl(201_45%_11%)] grid place-items-center"
                      aria-disabled={disabled}
                      onClick={
                        disabled
                          ? () => {}
                          : () => {
                              console.log(`Chose ${position}`);
                            }
                      }
                    >
                      {marker ? (
                        <Icon
                          className="size-10 tablet:size-16 data-[marker=x]:text-light-blue data-[marker=o]:text-light-yellow"
                          name={marker}
                          data-marker={marker}
                        />
                      ) : null}
                      {marker ? null : (
                        <Icon
                          className="size-10 tablet:size-16 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 data-[marker=x]:text-light-blue data-[marker=o]:text-light-yellow"
                          name="x-outline"
                          data-marker={"x"}
                          // name="o-outline"
                          // data-marker={"o"}
                        />
                      )}
                      <span className="sr-only">Choose {position}</span>
                    </button>
                  </li>
                );
              }
            )}
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
      <AlertDialog.Root open={winOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-[hsl(0_0%_0%/50%)] fixed inset-0 overflow-y-auto grid items-center">
            <AlertDialog.Content className="bg-semi-dark-navy text-silver pt-10 pb-12 px-6 tablet:py-11 text-center">
              <AlertDialog.Title className="font-bold tablet:text-heading-xs">
                {/*
                  Oh no, you lost
                  You won!
                  Round tied
                */}
                Player 2 wins!
              </AlertDialog.Title>
              <AlertDialog.Description
                className="mt-4 text-heading-m tablet:text-heading-l flex flex-wrap gap-2 tablet:gap-6 justify-center items-center data-[marker=x]:text-light-blue data-[marker=o]:text-light-yellow"
                data-marker="x"
              >
                <Icon
                  className="size-7 tablet:size-16"
                  name="x"
                  // name="o"
                />
                <span className="sr-only">X </span>takes the round
              </AlertDialog.Description>
              <ul
                className="mt-6 tablet:mt-8 flex flex-wrap gap-4 justify-center"
                role="list"
              >
                <li>
                  <AlertDialog.Cancel
                    className="bg-silver hocus:bg-silver-hover shadow-inner-small shadow-[hsl(198_17%_50%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
                    onClick={() => {
                      console.log("Navigate to menu");
                    }}
                  >
                    Quit
                  </AlertDialog.Cancel>
                </li>
                <li>
                  <AlertDialog.Action
                    className="bg-light-yellow hocus:bg-light-yellow-hover shadow-inner-small shadow-[hsl(39_83%_44%)] text-dark-navy text-heading-xs uppercase px-4 pt-[0.9375rem] pb-[1.0625rem] rounded-[0.625rem] transition-colors"
                    onClick={() => {
                      setWinOpen(false);
                    }}
                  >
                    Next round
                  </AlertDialog.Action>
                </li>
              </ul>
            </AlertDialog.Content>
          </AlertDialog.Overlay>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
