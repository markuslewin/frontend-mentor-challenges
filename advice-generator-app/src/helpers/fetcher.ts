export const createFetcher = () => {
  let controller: AbortController | undefined;
  return {
    fetch: (
      input: FetchParams[0],
      init?: Omit<NonNullable<FetchParams[1]>, "signal">
    ) => {
      if (controller !== undefined) {
        controller.abort();
      }
      controller = new AbortController();
      return fetch(input, { ...init, signal: controller.signal });
    },
  };
};

export const isAbortedFetch = (
  value: unknown
): value is DOMException & { name: "AbortError" } => {
  return value instanceof DOMException && value.name === "AbortError";
};

type FetchParams = Parameters<typeof fetch>;
