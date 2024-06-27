import { setupWorker } from "msw/browser";
import { handlers as quotableHandlers } from "./quotable";
import { http, passthrough } from "msw";

export const worker = setupWorker(
  ...quotableHandlers,
  http.get(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
  http.post(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
);
