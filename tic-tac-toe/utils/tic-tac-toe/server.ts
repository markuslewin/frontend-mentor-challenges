import { cookies } from "next/headers";
import { GameState, gameState, stateKey } from "./shared";

export function getState() {
  const stateCookie = cookies().get(stateKey);
  if (!stateCookie) {
    return { success: false, error: "No cookie" } as const;
  }

  let rawState: unknown;
  try {
    rawState = JSON.parse(stateCookie.value);
  } catch (error) {
    return { success: false, error } as const;
  }

  const result = gameState.safeParse(rawState);
  if (!result.success) {
    return { success: false, error: result.error } as const;
  }

  return { success: true, data: result.data } as const;
}

export function persistState(state: GameState) {
  cookies().set(stateKey, JSON.stringify(state));
}
