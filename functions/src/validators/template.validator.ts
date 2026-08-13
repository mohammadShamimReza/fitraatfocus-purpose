import { z } from "zod";

const visibilitySchema = z.enum(["public", "unlisted", "private"]);
const prioritySchema = z.enum(["low", "medium", "high"]);

export const createTemplateSchema = z.object({
  title: z.string().trim().min(2),
  purpose: z.string().trim().min(8),
  story: z.string().trim().min(8),
  description: z.string().trim().min(8),
  category: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).optional(),
  visibility: visibilitySchema.optional(),
  access: z.literal("free").optional(),
});

export const updateTemplateSchema = z
  .object({
    title: z.string().trim().min(2).optional(),
    purpose: z.string().trim().min(8).optional(),
    story: z.string().trim().min(8).optional(),
    description: z.string().trim().min(8).optional(),
    category: z.string().trim().min(1).optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
    visibility: visibilitySchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "No fields to update." });

export const createSectionSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
});

export const updateSectionSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    order: z.number().int().nonnegative().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "No fields to update." });

export const createTaskSchema = z.object({
  title: z.string().trim().min(1),
  notes: z.string().optional(),
  priority: prioritySchema.optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  sectionId: z.string().trim().min(1),
  estimatedMinutes: z.number().int().positive().optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    notes: z.string().optional(),
    priority: prioritySchema.optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
    sectionId: z.string().trim().min(1).optional(),
    order: z.number().int().nonnegative().optional(),
    estimatedMinutes: z.number().int().positive().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "No fields to update." });
