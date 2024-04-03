import { GameState, stateKey } from "./shared";

export function persistState(state: GameState) {
  document.cookie = `${stateKey}=${encodeURIComponent(JSON.stringify(state))}`;
}
