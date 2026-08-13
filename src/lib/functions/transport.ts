import { callFunction } from "./callable";
import { functionsRequest } from "./http";
import { functionNames } from "./names";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

/**
 * HTTP is the active Cloud Functions transport (`VITE_FUNCTIONS_URL`).
 * Callable names stay here if a later endpoint needs `httpsCallable`.
 */
export const functionsTransport = {
  callFunction,
  functionsRequest,
  unwrapData,
  functionNames,
  functionPaths,
};
