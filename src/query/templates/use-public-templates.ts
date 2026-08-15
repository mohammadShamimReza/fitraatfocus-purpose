import { queryOptions, useQuery } from "@tanstack/react-query";

import { listPublicTemplates } from "@/lib/api/templates";
import { templateKeys } from "@/query/keys/templates";

export function publicTemplatesQueryOptions() {
  return queryOptions({
    queryKey: templateKeys.public(),
    queryFn: listPublicTemplates,
  });
}

export function usePublicTemplatesQuery(enabled: boolean) {
  return useQuery({
    ...publicTemplatesQueryOptions(),
    enabled,
  });
}
