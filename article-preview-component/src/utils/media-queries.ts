export const useMediaQuery = (
  mq: MediaQueryList,
  handler: (matches: boolean) => void
) => {
  const handleChange = (e: MediaQueryListEvent) => {
    handler(e.matches);
  };

  const setup = () => {
    handler(mq.matches);
    mq.addEventListener("change", handleChange);
  };

  const cleanup = () => {
    mq.removeEventListener("change", handleChange);
  };

  return {
    setup,
    cleanup,
  };
};
