import { getFunctionsBaseUrl } from "@/lib/firebase/config";

export class FunctionsApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "FunctionsApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  searchParams?: Record<string, string | number | boolean | undefined>;
};

async function getBearerToken(): Promise<string> {
  const { getFirebaseAuth } = await import("@/lib/firebase/client");
  const user = getFirebaseAuth().currentUser;

  if (!user) {
    throw new FunctionsApiError("You need to sign in first.", 401);
  }

  return user.getIdToken();
}

function buildUrl(path: string, searchParams?: RequestOptions["searchParams"]): string {
  const baseUrl = getFunctionsBaseUrl();

  if (!baseUrl) {
    throw new FunctionsApiError("Functions URL is not configured. Add VITE_FUNCTIONS_URL to your .env file.", 503);
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${baseUrl}${normalizedPath}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
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

export async function functionsRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = await getBearerToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(buildUrl(path, options.searchParams), {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const raw = await response.text();
  let payload: unknown = null;

  if (raw) {
    try {
      payload = JSON.parse(raw) as unknown;
    } catch {
      payload = raw;
    }
  }

  if (!response.ok) {
    throw new FunctionsApiError(readErrorMessage(payload, `Request failed (${response.status}).`), response.status);
  }

  return payload as T;
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

export function unwrapData<T>(payload: unknown, keys: string[] = ["data", "template", "templates"]): T {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    for (const key of keys) {
      if (key in record) {
        return record[key] as T;
      }
    }
  }

  return payload as T;
}
