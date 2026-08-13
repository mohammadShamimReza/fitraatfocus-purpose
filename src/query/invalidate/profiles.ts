import type { QueryClient } from "@tanstack/react-query";

import { profileKeys } from "@/query/keys/profiles";
import { templateKeys } from "@/query/keys/templates";
import type { CreatorProfile } from "@/types/profile";

export async function invalidateProfileQueries(queryClient: QueryClient, profile?: CreatorProfile): Promise<void> {
  await queryClient.invalidateQueries({ queryKey: profileKeys.all });
  await queryClient.invalidateQueries({ queryKey: templateKeys.all });

  if (!profile) {
    return;
  }

  queryClient.setQueryData(profileKeys.me(), profile);
  queryClient.setQueryData(profileKeys.detail(profile.uid), profile);
}
