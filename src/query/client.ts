import { QueryClient } from "@tanstack/react-query";

import { shouldRetryFunctionsError } from "@/lib/api/errors";

export const QUERY_STALE_TIME_MS = 30_000;
export const QUERY_GC_TIME_MS = 5 * 60_000;

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME_MS,
        gcTime: QUERY_GC_TIME_MS,
        retry: (failureCount, error) => shouldRetryFunctionsError(error) && failureCount < 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
