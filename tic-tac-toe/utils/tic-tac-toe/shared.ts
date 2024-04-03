import { z } from "zod";

const Mark = z.union([z.literal("x"), z.literal("o")]);

export const gameState = z.object({
  playerOneMark: Mark,
  starterMark: Mark,
  opponent: z.union([z.literal("cpu"), z.literal("player")]),
  marks: z.array(Mark.or(z.literal(null))).length(9),
});

export type GameState = z.infer<typeof gameState>;
export type Mark = z.infer<typeof Mark>;

export const stateKey = "game";
