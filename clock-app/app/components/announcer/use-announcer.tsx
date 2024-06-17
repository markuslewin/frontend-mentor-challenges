import { context } from "#app/components/announcer/common";
import { invariant } from "@epic-web/invariant";
import { useContext } from "react";

export function useAnnouncer() {
  const value = useContext(context);
  invariant(value !== null, "Value of announcer context was null");

  return value;
}
