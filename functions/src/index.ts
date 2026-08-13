import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

import { app } from "./app";

setGlobalOptions({
  region: "us-central1",
  maxInstances: 10,
});

export const api = onRequest(
  {
    cors: true,
    invoker: "public",
  },
  app,
);
