import { redirect } from "next/navigation";
import { Game } from "./game";
import { getState } from "../../utils/tic-tac-toe/server";

export default function Play() {
  const result = getState();
  if (!result.success) {
    console.warn("Failed to retrieve game state", result.error);
    redirect("/");
  }

  return <Game initialState={result.data} />;
}
