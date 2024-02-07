import type { APIRoute } from "astro";
import { z } from "zod";
import { getAppState, setAppState } from "../utils/state";

const PledgeInput = z.object({
  id: z.enum([
    "none",
    "bamboo-stand",
    "black-edition-stand",
    "mahogany-special-edition",
  ] as const),
  amount: z.coerce.number().nonnegative(),
  // todo: check id + min
});

export const POST: APIRoute = async ({ request, cookies }) => {
  // todo: check stock
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
    pledges:
      result.data.id === "none"
        ? state.pledges
        : {
            ...state.pledges,
            [result.data.id]: state.pledges[result.data.id] + 1,
          },
  });
  return new Response();
};
