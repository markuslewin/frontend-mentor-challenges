import { useMatches } from "react-router-dom";
import { z } from "zod";

const NameHandleSchema = z.object({
  name: z.string(),
});

export function useName() {
  const matches = useMatches();

  const name = matches
    .map((match) => {
      const result = NameHandleSchema.safeParse(match.handle);
      return result.success ? result.data.name : null;
    })
    .find((name) => typeof name === "string");

  return { name };
}
