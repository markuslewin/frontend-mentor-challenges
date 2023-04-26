const adviceApi = import.meta.env.PUBLIC_ADVICE_API;

if (typeof adviceApi !== "string") {
  throw new Error("Missing environment variable PUBLIC_ADVICE_API");
}

export const env = {
  PUBLIC_ADVICE_KEY: adviceApi,
};
