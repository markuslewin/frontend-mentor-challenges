import { http, passthrough } from "msw";
import { setupWorker } from "msw/browser";
import { handlers as quotableHandlers } from "#app/mocks/quotable";
import { handlers as worldtimeapiHandlers } from "#app/mocks/worldtimeapi";
import { handlers as ipbaseHandlers } from "#app/mocks/ipbase";

export const worker = setupWorker(
  ...quotableHandlers,
  ...worldtimeapiHandlers,
  ...ipbaseHandlers,
  http.get(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
  http.post(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
);
