import { useCallback, useSyncExternalStore } from "react";

type Subscribe = Parameters<typeof useSyncExternalStore>[0];

export function useMedia(query: string) {
  const subscribe: Subscribe = useCallback(
    (callback) => {
      const mql = matchMedia(query);
      mql.addEventListener("change", callback);
      return () => {
        mql.removeEventListener("change", callback);
      };
    },
    [query]
  );

  return useSyncExternalStore(subscribe, () => matchMedia(query).matches);
}
