import { toFunctionsApiError } from "./errors";
import { getBearerToken } from "./token";
import { buildFunctionsUrl, type FunctionsSearchParams } from "./url";

export type FunctionsHttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type FunctionsHttpOptions = {
  method?: FunctionsHttpMethod;
  body?: unknown;
  searchParams?: FunctionsSearchParams;
  /** Default authenticates. Public routes use `false`. Owner-or-public reads use `"optional"`. */
  auth?: boolean | "optional";
};

async function parsePayload(response: Response): Promise<unknown> {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
}

export async function functionsRequest<T>(path: string, options: FunctionsHttpOptions = {}): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (options.auth === "optional") {
    try {
      headers.Authorization = `Bearer ${await getBearerToken()}`;
    } catch {
      // Public request when no session is present.
    }
  } else if (options.auth !== false) {
    headers.Authorization = `Bearer ${await getBearerToken()}`;
  }

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(buildFunctionsUrl(path, options.searchParams), {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const payload = await parsePayload(response);
  const failed =
    !response.ok ||
    (payload !== null && typeof payload === "object" && "ok" in payload && (payload as { ok?: unknown }).ok === false);

  if (failed) {
    throw toFunctionsApiError(payload, response.status, `Request failed (${response.status}).`);
  }

  return payload as T;
}
