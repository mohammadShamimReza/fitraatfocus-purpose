import { httpsCallable, type HttpsCallableOptions } from "firebase/functions";

import { getFirebaseFunctions } from "@/lib/firebase/functions";

import { toFunctionsApiError } from "./errors";

type CallableError = {
  code?: string;
  message?: string;
  details?: unknown;
};

function callableStatus(code: string | undefined): number {
  switch (code) {
    case "unauthenticated":
      return 401;
    case "permission-denied":
      return 403;
    case "not-found":
      return 404;
    case "invalid-argument":
    case "failed-precondition":
      return 400;
    case "already-exists":
      return 409;
    case "resource-exhausted":
      return 429;
    default:
      return 500;
  }
}

export async function callFunction<TRequest, TResult>(
  name: string,
  data?: TRequest,
  options?: HttpsCallableOptions,
): Promise<TResult> {
  try {
    const callable = httpsCallable<TRequest, TResult>(getFirebaseFunctions(), name, options);
    const result = await callable(data);
    return result.data;
  } catch (error) {
    const callableError = error as CallableError;
    throw toFunctionsApiError(
      {
        code: callableError.code,
        message: callableError.message,
        details: callableError.details,
      },
      callableStatus(callableError.code),
      callableError.message ?? `Function ${name} failed.`,
    );
  }
}
