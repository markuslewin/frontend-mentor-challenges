// Aborts the previous fetch before executing another one.
export const fetcher = (() => {
  let controller: AbortController | null = null;
  return {
    fetch(...args: Parameters<typeof fetch>) {
      const [input, init] = args;
      controller?.abort();
      controller = new AbortController();
      return fetch(input, { ...init, signal: controller.signal });
    },
  };
})();
