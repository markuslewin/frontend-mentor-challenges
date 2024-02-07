import type { AstroCookies } from "astro";
import { z } from "zod";

const COOKIE_NAME = "crowdfunding-product-page";

const StateSchema = z.object({
  isBookmarked: z.boolean().default(false),
  hasPledged: z.boolean().default(false),
  amount: z.number().default(0),
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
