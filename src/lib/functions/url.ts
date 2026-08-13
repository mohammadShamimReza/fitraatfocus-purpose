import { getFunctionsBaseUrl } from "@/lib/firebase/config";

import { FunctionsApiError } from "./errors";

export type FunctionsSearchParams = Record<string, string | number | boolean | undefined>;

export function buildFunctionsUrl(path: string, searchParams?: FunctionsSearchParams): string {
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
