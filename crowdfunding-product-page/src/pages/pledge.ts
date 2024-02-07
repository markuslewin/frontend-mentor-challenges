import type { APIRoute } from "astro";
import { COOKIE_NAME } from "../utils/cookie";
import { z } from "zod";

const StateSchema = z.object({
  isBookmarked: z.boolean().default(false),
  hasPledged: z.boolean().default(false),
  amount: z.number().default(0),
});

const PledgeInput = z.object({
  id: z.string(),
  amount: z.coerce.number().nonnegative(),
  // todo: check id + min
});

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const result = PledgeInput.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return new Response(null, { status: 400 });
  }
  const json = cookies.get(COOKIE_NAME)?.json();
  const state = StateSchema.parse(json ?? {});
  cookies.set(COOKIE_NAME, {
    ...state,
    hasPledged: true,
    amount: state.amount + result.data.amount,
  });
  return new Response();
};
