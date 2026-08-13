export const LANDING_PATH = "/";
export const DEFAULT_POST_AUTH_PATH = "/dashboard/systems";
export const CREATE_SYSTEM_PATH = "/dashboard/systems/new";

export type AuthRedirectSearch = {
  redirect?: string;
};

export function isSafeAppRedirect(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return false;
  }

  return path.startsWith("/dashboard") || path.startsWith("/systems") || path.startsWith("/creators");
}

export function parseAuthRedirectSearch(search: Record<string, unknown>): AuthRedirectSearch {
  return {
    redirect: typeof search.redirect === "string" && isSafeAppRedirect(search.redirect) ? search.redirect : undefined,
  };
}

export function getPostAuthPath(search: unknown): string {
  if (!search || typeof search !== "object") {
    return DEFAULT_POST_AUTH_PATH;
  }

  const redirect = "redirect" in search ? search.redirect : undefined;
  return typeof redirect === "string" && isSafeAppRedirect(redirect) ? redirect : DEFAULT_POST_AUTH_PATH;
}
