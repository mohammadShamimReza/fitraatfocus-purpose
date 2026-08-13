import { queryOptions, useQuery } from "@tanstack/react-query";

import { listMyTemplates } from "@/lib/functions/templates";
import { templateKeys } from "@/query/keys/templates";

export function myTemplatesQueryOptions() {
  return queryOptions({
    queryKey: templateKeys.mine(),
    queryFn: listMyTemplates,
  });
}

export function useMyTemplatesQuery(enabled: boolean) {
  return useQuery({
    ...myTemplatesQueryOptions(),
    enabled,
  });
}
