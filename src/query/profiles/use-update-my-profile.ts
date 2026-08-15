import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMyProfile } from "@/lib/api/profiles";
import { invalidateProfileQueries } from "@/query/invalidate/profiles";
import type { UpdateProfileInput } from "@/types/profile";

export function useUpdateMyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateMyProfile(input),
    onSuccess: (profile) => invalidateProfileQueries(queryClient, profile),
  });
}
