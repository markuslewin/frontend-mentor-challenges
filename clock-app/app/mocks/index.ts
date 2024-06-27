import { http, passthrough } from "msw";
import { setupWorker } from "msw/browser";
import { handlers as quotableHandlers } from "#app/mocks/quotable";
import { handlers as worldtimeapiHandlers } from "#app/mocks/worldtimeapi";

export const worker = setupWorker(
  ...quotableHandlers,
  ...worldtimeapiHandlers,
  http.get(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
  http.post(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
);
