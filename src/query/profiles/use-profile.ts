import { queryOptions, useQuery } from "@tanstack/react-query";

import { getProfile } from "@/lib/functions/profiles";
import { profileKeys } from "@/query/keys/profiles";

export function profileQueryOptions(uid: string) {
  return queryOptions({
    queryKey: profileKeys.detail(uid),
    queryFn: () => getProfile(uid),
  });
}

export function useProfileQuery(uid: string, enabled: boolean) {
  return useQuery({
    ...profileQueryOptions(uid),
    enabled: enabled && Boolean(uid),
  });
}
