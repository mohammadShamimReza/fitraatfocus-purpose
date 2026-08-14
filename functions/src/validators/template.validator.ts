import { z } from "zod";

const visibilitySchema = z.enum(["public", "unlisted", "private"]);
const prioritySchema = z.enum(["low", "medium", "high"]);

const optionalHttpUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => value === "" || /^https?:\/\//i.test(value), {
    message: "Must be an http(s) URL.",
  });

const tagSchema = z.string().trim().min(1).max(32);
const tagsSchema = z.array(tagSchema).max(12);

export const createTemplateSchema = z.object({
  title: z.string().trim().min(2).max(120),
  purpose: z.string().trim().min(8).max(4000),
  story: z.string().trim().min(8).max(4000),
  description: z.string().trim().min(8).max(4000),
  category: z.string().trim().min(1).max(32),
  tags: tagsSchema.optional(),
  visibility: visibilitySchema.optional(),
  access: z.literal("free").optional(),
});

export const updateTemplateSchema = z
  .object({
    title: z.string().trim().min(2).max(120).optional(),
    purpose: z.string().trim().min(8).max(4000).optional(),
    story: z.string().trim().min(8).max(4000).optional(),
    description: z.string().trim().min(8).max(4000).optional(),
    category: z.string().trim().min(1).max(32).optional(),
    tags: tagsSchema.optional(),
    visibility: visibilitySchema.optional(),
    imageUrl: optionalHttpUrl.optional(),
    storagePath: z.string().trim().max(512).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "No fields to update.",
  });

export const createSectionSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(2000).optional(),
});

export const updateSectionSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(2000).optional(),
    order: z.number().int().nonnegative().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "No fields to update.",
  });

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  notes: z.string().max(4000).optional(),
  priority: prioritySchema.optional(),
  tags: tagsSchema.optional(),
  sectionId: z.string().trim().min(1).max(64),
  estimatedMinutes: z.number().int().positive().max(24 * 60).optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    notes: z.string().max(4000).optional(),
    priority: prioritySchema.optional(),
    tags: tagsSchema.optional(),
    sectionId: z.string().trim().min(1).max(64).optional(),
    order: z.number().int().nonnegative().optional(),
    estimatedMinutes: z.number().int().positive().max(24 * 60).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "No fields to update.",
  });
