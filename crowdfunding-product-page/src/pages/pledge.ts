import type { APIRoute } from "astro";
import { z } from "zod";
import { getAppState, setAppState } from "../utils/state";

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
  const state = getAppState(cookies);
  setAppState(cookies, {
    ...state,
    amount: state.amount + result.data.amount,
    hasPledged: true,
  });
  return new Response();
};
