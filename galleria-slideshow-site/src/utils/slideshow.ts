import { useMatches } from "react-router-dom";
import { z } from "zod";

const SlideshowHandle = z.object({
  isSlideshow: z.boolean(),
});

export type SlideshowHandle = z.infer<typeof SlideshowHandle>;

export function useSlideshow() {
  const matches = useMatches();

  const isSlideshow = !!matches.filter((match) => {
    const result = SlideshowHandle.safeParse(match.handle);
    return result.success ? result.data.isSlideshow : false;
  }).length;

  return { isSlideshow };
}
