import { useSyncExternalStore, useCallback } from "react";

type Subscribe = Parameters<typeof useSyncExternalStore>[0];

export function useMedia(query: string) {
  const subscribe = useCallback<Subscribe>(
    (callback) => {
      const media = matchMedia(query);
      media.addEventListener("change", callback);
      return () => {
        media.removeEventListener("change", callback);
      };
    },
    [query]
  );
  const getSnapshot = useCallback(() => matchMedia(query).matches, [query]);

  const matches = useSyncExternalStore(subscribe, getSnapshot);

  return { matches };
}
