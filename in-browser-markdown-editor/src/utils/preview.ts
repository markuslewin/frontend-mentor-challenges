import { useMatches } from "react-router-dom";
import { z } from "zod";

const PreviewingMatchSchema = z.object({
  handle: z.object({
    previewing: z.literal(true),
  }),
});

export function getPreviewingHandle() {
  return {
    previewing: true,
  } satisfies z.infer<typeof PreviewingMatchSchema>["handle"];
}

export function usePreviewing() {
  const matches = useMatches();
  const previewing = matches.some((match) => {
    return PreviewingMatchSchema.safeParse(match).success;
  });
  return { previewing };
}
