import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";

import app from "./app";
import { initializeFirebaseAdmin } from "./config/admin";

setGlobalOptions({
  region: "us-central1",
  maxInstances: 10,
});

initializeFirebaseAdmin();

/**
 * Single HTTPS function that hosts the Studio Express MVC API.
 * Local:  http://127.0.0.1:5001/<project-id>/<region>/studio
 * Deploy: https://<region>-<project-id>.cloudfunctions.net/studio
 */
export const studio = onRequest(
  {
    cors: true,
    // Gen2 runs on Cloud Run. Without public invoker, Cloud Run rejects
    // Firebase ID tokens in Authorization with 401 before Express runs.
    // App auth is still enforced in requireAuth via verifyIdToken.
    invoker: "public",
  },
  app,
);
