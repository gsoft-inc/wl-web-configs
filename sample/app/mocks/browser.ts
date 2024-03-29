import { setupWorker, type SetupWorker } from "msw/browser";
import { handlers } from "./handlers.ts";

// This configures a Service Worker with the given request handlers.
export const worker: SetupWorker = setupWorker(...handlers);
