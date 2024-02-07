import type { AstroCookies } from "astro";
import { z } from "zod";

const COOKIE_NAME = "crowdfunding-product-page";

export const StateSchema = z.object({
  isBookmarked: z.boolean().default(false),
  hasPledged: z.boolean().default(false),
  amount: z.number().default(0),
  pledges: z
    .object({
      "bamboo-stand": z.number().default(0),
      "black-edition-stand": z.number().default(0),
      "mahogany-special-edition": z.number().default(0),
    })
    .default({
      "bamboo-stand": 0,
      "black-edition-stand": 0,
      "mahogany-special-edition": 0,
    }),
});

export function getAppState(cookies: AstroCookies) {
  const json = cookies.get(COOKIE_NAME)?.json();
  const state = StateSchema.parse(json ?? {});
  return state;
}

export function setAppState(
  cookies: AstroCookies,
  state: z.infer<typeof StateSchema>
) {
  cookies.set(COOKIE_NAME, state);
}
