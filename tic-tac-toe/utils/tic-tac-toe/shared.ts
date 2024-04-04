import { z } from "zod";

const Mark = z.union([z.literal("x"), z.literal("o")]);

export const gameState = z.object({
  playerOneMark: Mark,
  starterMark: Mark,
  opponent: z.union([z.literal("cpu"), z.literal("player")]),
  marks: z.array(Mark.or(z.literal(null))).length(9),
  score: z.object({
    x: z.number(),
    ties: z.number(),
    o: z.number(),
  }),
});

export type GameState = z.infer<typeof gameState>;
export type Mark = z.infer<typeof Mark>;

export const stateKey = "game";

export function getCpuIndex(marks: (Mark | null)[]) {
  const availableIndexes = marks
    .map((mark, i) => {
      return { mark, i };
    })
    .filter((option) => {
      return option.mark === null;
    })
    .map((available) => {
      return available.i;
    });
  return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
}
