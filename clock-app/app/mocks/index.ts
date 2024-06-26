import { setupWorker } from "msw/browser";
import { handlers as quotableHandlers } from "./quotable";

export const worker = setupWorker(...quotableHandlers);

await worker.start();
