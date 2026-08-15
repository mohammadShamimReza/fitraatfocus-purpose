export class FunctionsApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "FunctionsApiError";
    this.status = status;
    this.code = code;
  }
}

export function isFunctionsApiError(error: unknown): error is FunctionsApiError {
  return error instanceof FunctionsApiError;
}

export function getFunctionsErrorMessage(error: unknown): string {
  if (error instanceof FunctionsApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "The request failed. Try again.";
}

export function shouldRetryFunctionsError(error: unknown): boolean {
  if (!(error instanceof FunctionsApiError)) {
    return true;
  }

  return error.status >= 500;
}

function readErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }

    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
  }

  return fallback;
}

export function toFunctionsApiError(payload: unknown, status: number, fallback: string): FunctionsApiError {
  const record = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  const code = typeof record?.code === "string" ? record.code : undefined;

  return new FunctionsApiError(readErrorMessage(payload, fallback), status, code);
}
