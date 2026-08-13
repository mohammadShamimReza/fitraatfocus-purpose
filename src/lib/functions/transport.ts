import { callFunction } from "./callable";
import { functionsRequest } from "./http";
import { functionNames } from "./names";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

/**
 * HTTP is the active Cloud Functions transport (emulator in `npm run dev`, production in builds).
 * Callable names stay here if a later endpoint needs `httpsCallable`.
 */
export const functionsTransport = {
  callFunction,
  functionsRequest,
  unwrapData,
  functionNames,
  functionPaths,
};
