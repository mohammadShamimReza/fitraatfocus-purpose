import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyProfile, getProfile, updateMyProfile } from "@/lib/functions/profiles";
import type { UpdateProfileInput } from "@/types/profile";

import { queryKeys } from "./keys";

export function useMyProfileQuery(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.profiles.me(),
    queryFn: getMyProfile,
    enabled,
  });
}

export function useProfileQuery(uid: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.profiles.detail(uid),
    queryFn: () => getProfile(uid),
    enabled: enabled && Boolean(uid),
  });
}

export function useUpdateMyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateMyProfile(input),
    onSuccess: async (profile) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.templates.all });
      queryClient.setQueryData(queryKeys.profiles.me(), profile);
      queryClient.setQueryData(queryKeys.profiles.detail(profile.uid), profile);
    },
  });
}
