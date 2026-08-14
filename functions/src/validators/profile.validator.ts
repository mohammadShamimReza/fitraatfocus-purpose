import { z } from "zod";

const optionalHttpUrl = z
  .string()
  .trim()
  .max(512)
  .refine((value) => value === "" || /^https?:\/\//i.test(value), {
    message: "Must be an http(s) URL.",
  });

export const updateProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(80),
  headline: z.string().trim().min(1).max(160),
  bio: z.string().trim().min(1).max(4000),
  expertise: z.array(z.string().trim().min(1).max(48)).min(1).max(12),
  proof: z.string().trim().min(1).max(2000),
  location: z.string().trim().max(80),
  website: optionalHttpUrl,
  avatarUrl: optionalHttpUrl,
});
