import { queryOptions, useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/lib/api/profiles";
import { profileKeys } from "@/query/keys/profiles";

export function myProfileQueryOptions() {
  return queryOptions({
    queryKey: profileKeys.me(),
    queryFn: getMyProfile,
  });
}

export function useMyProfileQuery(enabled: boolean) {
  return useQuery({
    ...myProfileQueryOptions(),
    enabled,
  });
}
