"use client";

import Image from "next/image";
import logo from "@/app/logo.svg";
import Icon from "../components/icon";
import { invariant } from "@epic-web/invariant";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { GameState } from "./play/page";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen grid grid-cols-[minmax(0,28.75rem)] place-content-center p-6">
      <header>
        <h1>
          <Image
            className="w-[4.5rem] mx-auto"
            alt="Tic-tac-toe"
            src={logo}
            priority
          />
        </h1>
      </header>
      <main className="mt-10">
        <form
          className="text-center"
          onSubmit={(e) => {
            e.preventDefault();
            invariant(
              e.nativeEvent instanceof SubmitEvent,
              "Event must be SubmitEvent"
            );

            const formData = new FormData(
              e.currentTarget,
              e.nativeEvent.submitter
            );

            const result = z
              .object({
                "player-one-mark": z.union([z.literal("x"), z.literal("o")]),
                opponent: z.union([z.literal("cpu"), z.literal("player")]),
              })
              .parse(Object.fromEntries(formData));

            localStorage.setItem(
              "game",
              JSON.stringify({
                moves: [],
                opponent: result.opponent,
                playerOneMark: result["player-one-mark"],
              } satisfies GameState)
            );
            router.push("/play");
          }}
        >
          <fieldset
            className="bg-semi-dark-navy text-silver rounded-[0.9375rem] p-6 pb-[1.875rem] grid shadow-inner-large shadow-[hsl(201_45%_11%)]"
            aria-describedby="player-1-reminder"
          >
            <legend className="float-start text-heading-xs">
              Pick player 1&apos;s mark
            </legend>
            <div className="bg-dark-navy rounded-[0.625rem] px-2 py-[0.5625rem] grid grid-cols-2 mt-6">
              <label>
                <input
                  className="sr-only peer"
                  type="radio"
                  name="player-one-mark"
                  value="x"
                />
                <span className="sr-only"> X</span>
                <span className="peer-checked:bg-silver peer-checked:text-dark-navy rounded-[0.625rem] grid place-items-center p-[0.6875rem] hover:bg-semi-dark-navy peer-focus-visible:outline outline-[white] transition-colors">
                  <Icon className="size-8" name="x" />
                </span>
              </label>
              <label>
                <input
                  className="sr-only peer"
                  type="radio"
                  name="player-one-mark"
                  value="o"
                  defaultChecked={true}
                />
                <span className="sr-only"> O</span>
                <span className="peer-checked:bg-silver peer-checked:text-dark-navy rounded-[0.625rem] grid place-items-center p-[0.6875rem] hover:bg-semi-dark-navy peer-focus-visible:outline outline-[white] transition-colors">
                  <Icon className="size-8" name="o" />
                </span>
              </label>
            </div>
            <p className="opacity-50 mt-4" id="player-1-reminder">
              Remember: X goes first
            </p>
          </fieldset>
          <ul className="mt-10" role="list">
            <li>
              <button
                className="rounded-[0.9375rem] w-full bg-[hsl(39_83%_44%)] pt-2 group"
                type="submit"
                name="opponent"
                value="cpu"
              >
                <span className="block bg-light-yellow text-dark-navy p-[0.875rem] tablet:p-[1.0625rem] uppercase text-heading-xs tablet:text-heading-s rounded-[inherit] -translate-y-2 group-focus-visible:bg-light-yellow-hover group-hover:bg-light-yellow-hover transition-colors">
                  New Game (vs CPU)
                </span>
              </button>
            </li>
            <li className="mt-5">
              <button
                className="rounded-[0.9375rem] w-full bg-[hsl(178_79%_31%)] pt-2 group"
                type="submit"
                name="opponent"
                value="player"
              >
                <span className="block bg-light-blue text-dark-navy p-[0.875rem] tablet:p-[1.0625rem] uppercase text-heading-xs tablet:text-heading-s rounded-[inherit] -translate-y-2 group-focus-visible:bg-light-blue-hover group-hover:bg-light-blue-hover transition-colors">
                  New Game (vs player)
                </span>
              </button>
            </li>
          </ul>
        </form>
      </main>
    </div>
  );
}
