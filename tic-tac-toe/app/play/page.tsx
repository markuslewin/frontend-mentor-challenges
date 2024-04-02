import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Game } from "./game";

const Mark = z.union([z.literal("x"), z.literal("o")]);

const GameState = z.object({
  playerOneMark: Mark,
  starterMark: Mark,
  opponent: z.union([z.literal("cpu"), z.literal("player")]),
  marks: z.array(Mark.or(z.literal(null))).length(9),
});

export type GameState = z.infer<typeof GameState>;
export type Mark = z.infer<typeof Mark>;

export default function Play() {
  let state: GameState;
  try {
    const rawState = cookies().get("game")?.value;
    const object = JSON.parse(rawState!);
    state = GameState.parse(object);
  } catch (error) {
    console.warn("Failed to parse game state", error);
    redirect("/");
  }

  return <Game initialState={state} />;
}
