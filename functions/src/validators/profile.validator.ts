import { z } from "zod";

export const updateProfileSchema = z.object({
  displayName: z.string().trim().min(1),
  headline: z.string().trim().min(1),
  bio: z.string().trim().min(1),
  expertise: z.array(z.string().trim().min(1)).min(1),
  proof: z.string().trim().min(1),
  location: z.string().trim(),
  website: z.string().trim(),
  avatarUrl: z.string().trim(),
});
